export const TOGGLE_DRAWER = 'TOGGLE_DRAWER';
export const SET_DRAWER_STATE = 'SET_DRAWER_STATE';

export const KEY = 'drawer';

export const toggleDrawer = () => ({
  type: TOGGLE_DRAWER,
});

export const setDrawerState = isOpen => ({
  type: SET_DRAWER_STATE,
  isOpen,
});

const INITIAL_STATE = {
  isOpen: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TOGGLE_DRAWER:
      return {
        ...state,
        isOpen: !state.drawer.isOpen,
      };
    case SET_DRAWER_STATE:
      return {
        ...state,
        isOpen: action.isOpen,
      };
    default:
      return state;
  }
};
