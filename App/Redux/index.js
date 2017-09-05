import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import getReducers from './rootReducer';

const middlewares = [];
const enhancer = composeWithDevTools(
  {
    // Options: https://github.com/jhen0409/react-native-debugger#options
  },
)(applyMiddleware(...middlewares));

const initStore = apolloClient => {
  const store = createStore(getReducers(apolloClient), enhancer);
  /*eslint-disable no-undef*/
  if (module.hot) {
    module.hot.accept(() => {
      store.replaceReducer(getReducers(apolloClient));
    });
  }
  /*eslint-enable */
  return store;
};

export default initStore;
