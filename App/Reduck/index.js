import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'; // eslint-disable-line import/no-extraneous-dependencies
import getReducers from './rootReducer';
import { navigationMiddleware } from './Navigation';

const middlewares = [thunk, navigationMiddleware];
const enhancer = composeWithDevTools({
  // Options: https://github.com/jhen0409/react-native-debugger#options
})(applyMiddleware(...middlewares));

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
