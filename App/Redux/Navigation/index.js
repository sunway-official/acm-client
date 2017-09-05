import { StackNavigator } from 'react-navigation';
import routes, { config } from '../../Navigation/routes';

export const KEY = 'navigation';

export const AppNavigator = StackNavigator(routes, config);

export const INITIAL_STATE = null;

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    default:
      return AppNavigator.router.getStateForAction(action, state);
  }
};

// import drawerReducer, { KEY as DRAWER_KEY } from './Drawer';
// import routesReducer, { KEY as ROUTES_KEY } from './Routes';
// import stackReducer, {
//   KEY as STACK_KEY,
//   INITIAL_STATE as STACK_INITIAL_STATE,
// } from './Stack';

// import routesReducer, {
//   KEY as ROUTES_KEY,
//   INITIAL_STATE as ROUTES_INITIAL_STATE,
// } from './Routes';

// import drawerReducer, {
//   KEY as DRAWER_KEY,
//   INITIAL_STATE as DRAWER_INITIAL_STATE,
// } from './Drawer';

// export const KEY = 'navigation';
// export const INITIAL_STATE = {
//   [STACK_KEY]: STACK_INITIAL_STATE,
//   [ROUTES_KEY]: ROUTES_INITIAL_STATE,
//   [DRAWER_KEY]: DRAWER_INITIAL_STATE,
// };

// export default (state, action) => {
//   switch (action.type) {
//     default:
//       return {
//         [STACK_KEY]: stackReducer(state, action),
//         [ROUTES_KEY]: routesReducer(state, action),
//         [DRAWER_KEY]: drawerReducer(state, action),
//       };
//   }
// };
