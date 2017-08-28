import { combineReducers } from 'redux';
import DrawerReducer, { KEY as DRAWER_KEY } from './Drawer';

export default combineReducers({
  [DRAWER_KEY]: DrawerReducer,
});
