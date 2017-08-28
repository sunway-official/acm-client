import { AppRoutes, INITIAL_ROUTE_NAME } from './Routes';
import { StackNavigator } from 'react-navigation';

export const TOGGLE_DRAWER = 'TOGGLE_DRAWER';
export const SET_DRAWER_STATE = 'SET_DRAWER_STATE';

export const KEY = 'nav';

export const toggleDrawer = () => ({
  type: TOGGLE_DRAWER,
});

export const setDrawerState = isOpen => ({
  type: SET_DRAWER_STATE,
  isOpen,
});

export const AppNavigator = StackNavigator(AppRoutes, {
  navigationOptions: {
    header: null,
  },
  initialRouteName: INITIAL_ROUTE_NAME,
});

const INITIAL_STATE = {
  drawer: {
    isOpen: false,
  },
  navigation: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TOGGLE_DRAWER:
      return {
        ...state,
        drawer: {
          ...state.drawer,
          isOpen: !state.drawer.isOpen,
        },
      };
    case SET_DRAWER_STATE:
      return {
        ...state,
        drawer: {
          ...state.drawer,
          isOpen: action.isOpen,
        },
      };
    default:
      return {
        ...state,
        navigation: AppNavigator.router.getStateForAction(
          action,
          state.navigation,
        ),
        drawer: {
          ...state.drawer,
          isOpen: false,
        },
      };
  }
};
