import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import NavigationReducer, { KEY as NAVIGATION_KEY } from './Navigation';
import DrawerReducer, { KEY as DRAWER_KEY } from './Drawer';
import RoutesReducer, { KEY as ROUTES_KEY } from './Routes';
import ToolbarReducer, { KEY as TOOLBAR_KEY } from './Toolbar';
import ModalReducer, { KEY as MODAL_KEY } from './Modal';
import AuthenticationReducer, { KEY as AUTH_KEY } from './Authentication';

export default apolloClient => {
  apolloReducer = apolloClient.reducer();
  const reducers = {
    [NAVIGATION_KEY]: NavigationReducer,
    [DRAWER_KEY]: DrawerReducer,
    [ROUTES_KEY]: RoutesReducer,
    [TOOLBAR_KEY]: ToolbarReducer,
    [MODAL_KEY]: ModalReducer,
    [AUTH_KEY]: AuthenticationReducer,
    form: formReducer,
    apollo: apolloReducer,
  };
  return combineReducers(reducers);
};
