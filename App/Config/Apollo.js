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

const create = async (initialState = {}) => {
  const networkInterface = createNetworkInterface({
    uri: APOLLO_SERVER_ENDPOINT,
    opts: {
      // Additional options like `credentials` or `headers`
    },
  });
  const wsClient = new SubscriptionClient(APOLLO_SERVER_SUBSCRIPTION_ENDPOINT, {
    reconnect: true,
    connectionParams: {
      authToken: await AsyncStorage.getItem('token'),
      refreshToken: await AsyncStorage.getItem('refreshToken'),
    },
  });
  const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
    networkInterface,
    wsClient,
  );
  networkInterface.use([
    {
      applyMiddleware: async (req, next) => {
        if (!req.options.headers) {
          req.options.headers = {}; // Create the header object if needed.
        }
        let token = undefined;
        let refreshToken = undefined;
        try {
          const token = await AsyncStorage.getItem('token');
          const refreshToken = await AsyncStorage.getItem('refreshToken');
        } catch (err) {}
        req.options.headers.authorization = token;
        req.options.headers.refreshToken = refreshToken;
        next();
      },
    },
  ]);
  networkInterface.useAfter([
    {
      applyAfterware: async ({ response }, next) => {
        response.clone().json().then(async res => {
          if (res.errors && res.errors[0].message === 'unauthorized') {
            await AsyncStorage.removeItem('token');
            await AsyncStorage.removeItem('refreshToken');
            await AsyncStorage.removeItem('id');
            console.log('Clear');
            next();
          }
        });
        const token = response.headers.get('X-Token');
        const refreshToken = response.headers.get('X-Refresh-Token');
        if (token && refreshToken) {
          await AsyncStorage.setItem('token', token);
          await AsyncStorage.setItem('refreshToken', refreshToken);
        }
        next();
      },
    },
  ]);
  return new ApolloClient({
    initialState,
    networkInterface: networkInterface,
  });
};

export default async (initialState = {}) => {
  if (!apolloClient) {
    apolloClient = await create(initialState);
  }
  return apolloClient;
};
