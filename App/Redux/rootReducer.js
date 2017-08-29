import { combineReducers } from 'redux';
import DrawerReducer, { KEY as DRAWER_KEY } from './Drawer';

export default apollo =>
  combineReducers({
    [DRAWER_KEY]: DrawerReducer,
    apollo: apollo.reducer(),
  });
