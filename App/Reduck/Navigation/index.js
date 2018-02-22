import { StackNavigator } from 'react-navigation';
import { generateConfig, generateRoutes } from 'Navigation/resolver';
import {
  createReactNavigationReduxMiddleware,
  createReduxBoundAddListener,
} from 'react-navigation-redux-helpers';
export { default as NavigationActions } from './action';

export const KEY = 'navigation';

export const AppNavigator = StackNavigator(generateRoutes(), generateConfig());

// Note: createReactNavigationReduxMiddleware must be run before createReduxBoundAddListener
export const navigationMiddleware = createReactNavigationReduxMiddleware(
  'root',
  state => state[KEY],
);

export const addListener = createReduxBoundAddListener('root');

export const INITIAL_STATE = null;

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    default:
      return AppNavigator.router.getStateForAction(action, state);
  }
};
