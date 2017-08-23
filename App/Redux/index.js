import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './RootReducer';

const middlewares = [];
const enhancer = composeWithDevTools(
  {
    // Options: https://github.com/jhen0409/react-native-debugger#options
  },
)(applyMiddleware(...middlewares));

export const getStore = () => {
  const store = createStore(rootReducer, enhancer);
  /*eslint-disable no-undef*/
  if (module.hot) {
    module.hot.accept(() => {
      store.replaceReducer(require('./RootReducer').default);
    });
  }
  /*eslint-enable */
  return store;
};

export default {
  getStore
};
