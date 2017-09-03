import types from './types';

const setLoggedIn = () => ({
  type: types.SET_LOGGED_IN,
});

const setLoggedOut = () => ({
  type: types.SET_LOGGED_OUT,
});

export default {
  setLoggedIn,
  setLoggedOut,
};
