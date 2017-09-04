import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import DrawerReducer, { KEY as DRAWER_KEY } from './Drawer';

export default apollo =>
  combineReducers({
    [DRAWER_KEY]: DrawerReducer,
    apollo: apollo.reducer(),
    form: formReducer,
  });
