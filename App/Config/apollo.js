import { ApolloClient, createNetworkInterface } from 'react-apollo';
import {
  SubscriptionClient,
  /*addGraphQLSubscriptions*/
} from 'subscriptions-transport-ws';
import { addGraphQLSubscriptions } from 'add-graphql-subscriptions'; // Fix Yellow box issue
import { AsyncStorage, Linking } from 'react-native';
import {
  SERVER_ENDPOINT,
  SERVER_SUBSCRIPTION_ENDPOINT,
  IS_DEBUGGING,
} from '~/env';
import { transformServerEndPoint } from '../Transformer';

let apolloClient = null;

const create = async (initialState = {}) => {
  const token = await AsyncStorage.getItem('token');
  const refreshToken = await AsyncStorage.getItem('refreshToken');

  /**
   * Change end point if debugger is enable
   */
  let networkInterfaceURI = SERVER_ENDPOINT;
  if (IS_DEBUGGING) {
    const initialURL = await Linking.getInitialURL();
    networkInterfaceURI = transformServerEndPoint(initialURL);
  }

  const networkInterface = createNetworkInterface({
    uri: networkInterfaceURI,
    opts: {
      // Additional options like `credentials` or `headers`
    },
  });
  const wsClient = new SubscriptionClient(SERVER_SUBSCRIPTION_ENDPOINT, {
    reconnect: true,
    connectionParams: {
      authToken: token,
      refreshToken: refreshToken,
    },
  });
  networkInterface.use([
    {
      applyMiddleware: async (req, next) => {
        if (!req.options.headers) {
          req.options.headers = {}; // Create the header object if needed.
        }

        const token = await AsyncStorage.getItem('token');
        const refreshToken = await AsyncStorage.getItem('refreshToken');
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

  const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
    networkInterface,
    wsClient,
  );
  return new ApolloClient({
    initialState,
    networkInterface: networkInterfaceWithSubscriptions,
  });
};

export default async () => {
  if (!apolloClient) {
    apolloClient = await create(undefined);
  }
  return apolloClient;
};
