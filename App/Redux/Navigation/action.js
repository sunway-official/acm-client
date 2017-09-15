import { NavigationActions } from 'react-navigation';
import { setHeaderOptions, setFooterOptions } from '../Toolbar/action';

const dispatcher = type => {
  return options => async (dispatch, getState) => {
    await dispatch(NavigationActions[type](options));

    const { navigation, routes } = getState();
    const { routeName } = navigation.routes[navigation.index];
    const route = routes[routeName] || {};

    await dispatch(setHeaderOptions(route.header));
    await dispatch(setFooterOptions(route.footer));
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
