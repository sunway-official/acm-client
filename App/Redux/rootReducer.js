import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import DrawerReducer, { KEY as DRAWER_KEY } from './Drawer';
import NavigationReducer, { KEY as NAVIGATION_KEY } from './Navigation';
import LoginReducer, { KEY as LOGIN_KEY } from './Login';

export default appolo => {
  let reducers = {
    [DRAWER_KEY]: DrawerReducer,
    [NAVIGATION_KEY]: NavigationReducer,
    [LOGIN_KEY]: LoginReducer,
    form: formReducer,
  };
  if (appolo) {
    reducers = { ...reducers, apollo: apollo.reducer() };
  }
  return combineReducers(reducers);
};
