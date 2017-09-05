export const KEY = 'routes';

export const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case '@@INIT':
      return require('../../Navigation/routes').default;
    default:
      return state;
  }
};
