import { createStore, applyMiddleware } from 'redux';
/*eslint-disable import/no-extraneous-dependencies */
import { composeWithDevTools } from 'redux-devtools-extension';
/*eslint-enable import/no-extraneous-dependencies */
import getReducers from './rootReducer';

const middlewares = [];
const enhancer = composeWithDevTools(
  {
    // Options: https://github.com/jhen0409/react-native-debugger#options
  },
)(applyMiddleware(...middlewares));

const initStore = apollo => {
  const store = createStore(getReducers(apollo), enhancer);
  /*eslint-disable no-undef*/
  if (module.hot) {
    module.hot.accept(() => {
      store.replaceReducer(getReducers(apollo));
    });
  }
  /*eslint-enable */
  return store;
};

export default initStore;
