import { StackNavigator } from 'react-navigation';
import routes, { config } from '../../Navigation/routes';

export const KEY = 'navigation';

export const AppNavigator = StackNavigator(routes, config);

export const INITIAL_STATE = null;

export default (state = INITIAL_STATE, action) => {
  console.log('Reducing action: ', action.type);
  switch (action.type) {
    default:
      return AppNavigator.router.getStateForAction(action, state);
  }
};
