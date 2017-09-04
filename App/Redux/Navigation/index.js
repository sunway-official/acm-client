import { Reducer, ActionConst } from 'react-native-router-flux';

export const KEY = 'navigation';

const defaultReducer = Reducer();

export default (state, action) => {
  console.log('Reducing action: ', action.type);
  switch (action.type) {
    case ActionConst.FOCUS:
      console.log('FOCUS event fired with scene parameter: ', action.routeName);
      return defaultReducer(state, action);

    default:
      return defaultReducer(state, action);
  }
};
