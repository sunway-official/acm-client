import { StackNavigator } from 'react-navigation';
import routes, { config } from '~/App/Navigation/routes';

export const KEY = 'navigation';

export const AppNavigator = StackNavigator(routes, config);

export const INITIAL_STATE = null;

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    default:
      return AppNavigator.router.getStateForAction(action, state);
  }
};
