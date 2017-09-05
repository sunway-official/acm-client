import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import NavigationReducer, { KEY as NAVIGATION_KEY } from './Navigation';
import DrawerReducer, { KEY as DRAWER_KEY } from './Drawer';
import RoutesReducer, { KEY as ROUTES_KEY } from './Routes';

export default apollo => {
  apolloReducer = apollo.reducer();
  const reducers = {
    [NAVIGATION_KEY]: NavigationReducer,
    [DRAWER_KEY]: DrawerReducer,
    [ROUTES_KEY]: RoutesReducer,
    form: formReducer,
    apollo: apolloReducer,
  };
  return combineReducers(reducers);
};
