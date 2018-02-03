import { StackNavigator } from 'react-navigation';
import { generateConfig, generateRoutes } from 'Navigation/resolver';
export { default as NavigationActions } from './action';

export const KEY = 'navigation';

export const AppNavigator = StackNavigator(generateRoutes(), generateConfig());

export const INITIAL_STATE = null;

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    default:
      return AppNavigator.router.getStateForAction(action, state);
  }
};
