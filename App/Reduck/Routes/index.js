export const KEY = 'routes';

export const INITIAL_STATE = {};

export default (
  state = require('Navigation/resolver').generateRoutes(),
  action,
) => {
  switch (action.type) {
    default:
      return state;
  }
};
