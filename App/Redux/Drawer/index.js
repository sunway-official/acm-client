export const TOGGLE_DRAWER = 'TOGGLE_DRAWER';
export const SET_DRAWER_STATE = 'SET_DRAWER_STATE';
export const DISABLE_GESTURES = 'DISABLE_GESTURES';
export const ENABLE_GESTURES = 'ENABLE_GESTURES';
export const SET_DISABLE_GESTURES = 'SET_DISABLE_GESTURES';

export const KEY = 'drawer';

export const toggleDrawer = () => ({
  type: TOGGLE_DRAWER,
});

export const setDrawerState = isOpen => ({
  type: SET_DRAWER_STATE,
  isOpen,
});

export const setDisableGestures = isDisableGestures => ({
  type: SET_DISABLE_GESTURES,
  isDisableGestures,
});

export const disableGestures = () => ({
  type: DISABLE_GESTURES,
});

export const enableGestures = () => ({
  type: ENABLE_GESTURES,
});

const INITIAL_STATE = {
  isOpen: false,
  disableGestures: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TOGGLE_DRAWER:
      return {
        ...state,
        isOpen: !state.isOpen,
      };
    case SET_DRAWER_STATE:
      return {
        ...state,
        isOpen: action.isOpen,
      };
    case DISABLE_GESTURES:
      return {
        ...state,
        disableGestures: true,
      };
    case SET_DRAWER_STATE:
      return {
        ...state,
        disableGestures: false,
      };
    case SET_DISABLE_GESTURES:
      return {
        ...state,
        disableGestures: action.isDisableGestures,
      };
    default:
      return state;
  }
};
