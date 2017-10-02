import { NavigationActions } from 'react-navigation';
import { resetHeaderOptions, resetFooterOptions } from '../Toolbar/action';
import { enableGestures, disableGestures } from '../Drawer';

/* eslint-disable */
const NAVIGATE = 'navigate';
const BACK = 'back';
const RESET = 'reset';
/* eslint-enable */

const RESET_INDEX = 0;

const dispatcher = type => {
  return options => async (dispatch, getState) => {
    // Override Reset Actions
    if (type === RESET) {
      await dispatch(
        NavigationActions[RESET]({
          index: RESET_INDEX,
          actions: [NavigationActions[NAVIGATE](options)],
        }),
      );
    } else {
      await dispatch(NavigationActions[type](options));
    }

    const { navigation, routes } = getState();
    const { routeName } = navigation.routes[navigation.index];
    const route = routes[routeName] || {};

    await dispatch(resetHeaderOptions(route.header));
    await dispatch(resetFooterOptions(route.footer));

    // Disable or enable gesture if needed
    if (route.drawer && route.drawer.disableGestures) {
      await dispatch(disableGestures());
    } else {
      await dispatch(enableGestures());
    }
  };
};

export const navigate = dispatcher(NAVIGATE);

export const back = dispatcher(BACK);

export const reset = dispatcher(RESET);

export default {
  navigate,
  back,
  reset,
};
