import { combineReducers } from 'redux';
import NavigationReducer, { KEY as NAVIGATION_KEY } from '../Navigation/Redux';

export default combineReducers({


  [NAVIGATION_KEY]: NavigationReducer
});
