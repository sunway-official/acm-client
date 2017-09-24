export const TOGGLE_MODAL = 'TOGGLE_MODAL';
export const SET_MODAL_STATE = 'SET_MODAL_STATE';

export const KEY = 'modal';

export const toggleModal = () => ({
  type: TOGGLE_MODAL,
});

export const setModalState = isOpen => ({
  type: SET_MODAL_STATE,
  isOpen,
});

const INITIAL_STATE = {
  isOpen: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TOGGLE_MODAL:
      return {
        ...state,
        isOpen: !state.isOpen,
      };
    case SET_MODAL_STATE:
      return {
        ...state,
        isOpen: action.isOpen,
      };
    default:
      return state;
  }
};
