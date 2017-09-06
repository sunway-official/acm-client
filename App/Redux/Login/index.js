export const SET_LOGGED_IN = '@@redux-form/SET_SUBMIT_SUCCEEDED';
export const SET_LOGGED_OUT = 'SET_LOGGED_OUT';

export const KEY = 'login';

export const setLoggedIn = () => ({
  type: SET_LOGGED_IN,
});

export const setLoggedOut = () => ({
  type: SET_LOGGED_OUT,
});

export const INITIAL_STATE = {
  isLoggedIn: false,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_LOGGED_IN: {
      const newState = Object.assign(INITIAL_STATE, state, {
        isLoggedIn: true,
      });
      return newState;
    }
    case SET_LOGGED_OUT: {
      const newState = Object.assign(INITIAL_STATE, state, {
        isLoggedIn: false,
      });
      return newState;
    }
    default: {
      return state;
    }
  }
};

export default reducer;
