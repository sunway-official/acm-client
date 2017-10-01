import { NavigationActions } from 'react-navigation';
import { resetHeaderOptions, resetFooterOptions } from '../Toolbar/action';
import { setDisableGestures } from '../Drawer';

const dispatcher = type => {
  return options => async (dispatch, getState) => {
    await dispatch(NavigationActions[type](options));

    const { navigation, routes } = getState();
    const { routeName } = navigation.routes[navigation.index];
    const route = routes[routeName] || {};

    await dispatch(resetHeaderOptions(route.header));
    await dispatch(resetFooterOptions(route.footer));
    await dispatch(
      setDisableGestures(route.drawer && route.drawer.disableGestures),
    );
  };
};

export const navigate = dispatcher('navigate');

export const back = dispatcher('back');

export const reset = dispatcher('reset');

export default {
  navigate,
  back,
  reset,
};
