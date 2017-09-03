import types from './types';

const reducer = (state = {}, action) => {
  switch (action.type) {
    case types.SET_LOGGED_IN:
      const newState = Object.assign({}, state, {
        isLoggedIn: true,
      });
      return newState;
    case types.SET_LOGGED_OUT:
      const newState = Object.assign({}, state, {
        isLoggedIn: false,
      });
      return newState;
    default:
      return state;
  }
};

export default reducer;
