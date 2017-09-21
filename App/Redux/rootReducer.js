import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import NavigationReducer, { KEY as NAVIGATION_KEY } from './Navigation';
// import LoginReducer, { KEY as LOGIN_KEY } from './Login';
import DrawerReducer, { KEY as DRAWER_KEY } from './Drawer';
import RoutesReducer, { KEY as ROUTES_KEY } from './Routes';
import ToolbarReducer, { KEY as TOOLBAR_KEY } from './Toolbar';

export default apollo => {
  apolloReducer = apollo.reducer();
  const reducers = {
    [NAVIGATION_KEY]: NavigationReducer,
    // [LOGIN_KEY]: LoginReducer,
    [DRAWER_KEY]: DrawerReducer,
    [ROUTES_KEY]: RoutesReducer,
    [TOOLBAR_KEY]: ToolbarReducer,
    form: formReducer,
    apollo: apolloReducer,
  };
  return combineReducers(reducers);
};
