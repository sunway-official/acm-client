import {
  TOGGLE_FOOTER,
  TOGGLE_HEADER,
  SET_FOOTER_STATE,
  SET_HEADER_STATE,
  ADD_HEADER_OPTIONS,
  ADD_FOOTER_OPTIONS,
  RESET_HEADER_OPTIONS,
  RESET_FOOTER_OPTIONS,
} from './action';

export const KEY = 'toolbar';

const routes = require('~/Navigation/resolver').generateRoutes();
const initialRoute = {};

Object.keys(routes).map(key => {
  if (routes[key].initial) initialRoute = routes[key];
});

const INITIAL_STATE = {
  header: {
    isOpen: true,
    options: initialRoute.header,
  },
  footer: {
    isOpen: true,
    options: initialRoute.footer,
  },
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TOGGLE_HEADER:
      return {
        ...state,
        header: {
          ...state.header,
          isOpen: !state.header.isOpen,
        },
      };
    case SET_HEADER_STATE:
      return {
        ...state,
        header: {
          ...state.header,
          isOpen: action.header.isOpen,
        },
      };
    case RESET_HEADER_OPTIONS:
      return {
        ...state,
        header: {
          ...state.header,
          options: action.payload,
        },
      };
    case ADD_HEADER_OPTIONS:
      return {
        ...state,
        header: {
          ...state.header,
          options: {
            ...state.header.options,
            ...action.payload,
          },
        },
      };
    case TOGGLE_FOOTER:
      return {
        ...state,
        footer: {
          ...state.footer,
          isOpen: !state.footer.isOpen,
        },
      };
    case SET_FOOTER_STATE:
      return {
        ...state,
        footer: {
          ...state.footer,
          isOpen: action.footer.isOpen,
        },
      };
    case RESET_FOOTER_OPTIONS:
      return {
        ...state,
        footer: {
          ...state.footer,
          options: action.payload,
        },
      };
    case ADD_FOOTER_OPTIONS:
      return {
        ...state,
        footer: {
          ...state.footer,
          options: {
            ...state.footer.options,
            ...action.payload,
          },
        },
      };
    default:
      return state;
  }
};
