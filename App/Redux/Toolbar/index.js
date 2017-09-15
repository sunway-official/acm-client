import {
  TOGGLE_FOOTER,
  TOGGLE_HEADER,
  SET_FOOTER_STATE,
  SET_HEADER_STATE,
  SET_HEADER_OPTIONS,
  SET_FOOTER_OPTIONS,
} from './action';

export const KEY = 'toolbar';

const INITIAL_STATE = {
  header: {
    isOpen: true,
    options: {},
  },
  footer: {
    isOpen: true,
    options: {},
  },
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TOGGLE_HEADER:
      return {
        ...state,
        header: {
          ...state.header,
          isOpen: !state.isOpen,
        },
      };
    case SET_HEADER_STATE:
      return {
        ...state,
        header: {
          ...state.header,
          isOpen: action.isOpen,
        },
      };
    case SET_HEADER_OPTIONS:
      return {
        ...state,
        header: {
          ...state.header,
          options: action.payload,
        },
      };
    case TOGGLE_FOOTER:
      return {
        ...state,
        footer: {
          ...state.footer,
          isOpen: !state.isOpen,
        },
      };
    case SET_FOOTER_STATE:
      return {
        ...state,
        footer: {
          ...state.footer,
          isOpen: action.isOpen,
        },
      };
    case SET_FOOTER_OPTIONS:
      return {
        ...state,
        footer: {
          ...state.footer,
          options: action.payload,
        },
      };
    default:
      return state;
  }
};
