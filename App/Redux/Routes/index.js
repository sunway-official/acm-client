export const KEY = 'routes';

export const INITIAL_STATE = {};

export default (state = require('~/Navigation/routes').default, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
