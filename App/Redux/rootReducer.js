import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import DrawerReducer, { KEY as DRAWER_KEY } from './Drawer';
import NavigationReducer, { KEY as NAVIGATION_KEY } from './Navigation';

export default apollo =>
  combineReducers({
    [DRAWER_KEY]: DrawerReducer,
    [NAVIGATION_KEY]: NavigationReducer,
    apollo: apollo.reducer(),
    form: formReducer,
  });
