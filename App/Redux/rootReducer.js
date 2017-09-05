import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import DrawerReducer, { KEY as DRAWER_KEY } from './Drawer';
import NavigationReducer, { KEY as NAVIGATION_KEY } from './Navigation';

let reducers = {
  [DRAWER_KEY]: DrawerReducer,
  [NAVIGATION_KEY]: NavigationReducer,
  form: formReducer,
};

export default appolo => {
  if (appolo) {
    reducers = { ...reducers, apollo: apollo.reducer() };
  }
  return combineReducers(reducers);
};
