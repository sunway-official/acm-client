import { ApolloClient, createNetworkInterface } from 'react-apollo';
import {
  SubscriptionClient,
  /*addGraphQLSubscriptions*/
} from 'subscriptions-transport-ws';
import { addGraphQLSubscriptions } from 'add-graphql-subscriptions'; // Fix Yellow box issue
import { AsyncStorage } from 'react-native';
import {
  APOLLO_SERVER_ENDPOINT,
  APOLLO_SERVER_SUBSCRIPTION_ENDPOINT,
} from 'react-native-dotenv';

let apolloClient = null;

const create = (initialState = {}, { token, refreshToken }) => {
  const networkInterface = createNetworkInterface({
    uri: APOLLO_SERVER_ENDPOINT,
    opts: {
      // Additional options like `credentials` or `headers`
    },
  });
  const wsClient = new SubscriptionClient(APOLLO_SERVER_SUBSCRIPTION_ENDPOINT, {
    reconnect: true,
    connectionParams: {
      authToken: token,
      refreshToken: refreshToken,
    },
  });
  const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
    networkInterface,
    wsClient,
  );
  networkInterface.use([
    {
      applyMiddleware: (req, next) => {
        if (!req.options.headers) {
          req.options.headers = {}; // Create the header object if needed.
        }
        const token = token;
        const refreshToken = refreshToken;
        req.options.headers.authorization = token;
        req.options.headers.refreshToken = refreshToken;
        next();
      },
    },
  ]);
  networkInterface.useAfter([
    {
      applyAfterware: ({ response }, next) => {
        response.clone().json().then(res => {
          if (res.errors && res.errors[0].message === 'unauthorized') {
            AsyncStorage.multiRemove(['id', 'token', 'refreshToken']).then(
              next,
            );
          }
        });
        const token = response.headers.get('X-Token');
        const refreshToken = response.headers.get('X-Refresh-Token');
        if (token && refreshToken) {
          AsyncStorage.multiSet([
            ['token', token],
            ['refreshToken', refreshToken],
          ]).then(next);
        } else {
          next();
        }
      },
    },
  ]);
  return new ApolloClient({
    initialState,
    networkInterface: networkInterfaceWithSubscriptions,
  });
};

export default (token = {}) => {
  if (!apolloClient) {
    apolloClient = create(undefined, token);
  }
  return apolloClient;
};
