import { NavigationActions } from 'react-navigation';
import { setHeaderOptions, setFooterOptions } from '../Toolbar/action';

const dispatcher = type => {
  return options => async (dispatch, getState) => {
    const { navigation, routes } = getState();
    const { routeName } = navigation.routes[navigation.index];
    const route = routes[routeName] || {};

    dispatch(setHeaderOptions(route.header));
    dispatch(setFooterOptions(route.footer));

    return dispatch(NavigationActions[type](options));
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
