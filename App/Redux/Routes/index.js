import routes from '../../Navigation/routes';

export const KEY = 'routes';

export const INITIAL_STATE = routes;

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
