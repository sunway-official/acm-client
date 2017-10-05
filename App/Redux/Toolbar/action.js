export const TOGGLE_HEADER = 'TOGGLE_HEADER';
export const SET_HEADER_STATE = 'SET_HEADER_STATE';
export const TOGGLE_FOOTER = 'TOGGLE_FOOTER';
export const SET_FOOTER_STATE = 'SET_FOOTER_STATE';
export const ADD_HEADER_OPTIONS = 'ADD_HEADER_OPTIONS';
export const ADD_FOOTER_OPTIONS = 'ADD_FOOTER_OPTIONS';
export const RESET_HEADER_OPTIONS = 'RESET_HEADER_OPTIONS';
export const RESET_FOOTER_OPTIONS = 'RESET_FOOTER_OPTIONS';
export const OPEN_HEADER_MENU = 'OPEN_HEADER_MENU';
export const CLOSE_HEADER_MENU = 'CLOSE_HEADER_MENU';
export const SET_HEADER_MENU_STATE = 'SET_HEADER_MENU_STATE';

export const toggleHeader = () => ({
  type: TOGGLE_HEADER,
});

export const setHeaderVisible = isOpen => ({
  type: SET_HEADER_STATE,
  isOpen,
});

export const toggleFooter = () => ({
  type: TOGGLE_FOOTER,
});

export const setFooterVisible = isOpen => ({
  type: SET_FOOTER_STATE,
  isOpen,
});

export const resetHeaderOptions = options => ({
  type: RESET_HEADER_OPTIONS,
  payload: options,
});

export const resetFooterOptions = options => ({
  type: RESET_FOOTER_OPTIONS,
  payload: options,
});

export const addHeaderOptions = options => ({
  type: ADD_HEADER_OPTIONS,
  payload: options,
});

export const addFooterOptions = options => ({
  type: ADD_FOOTER_OPTIONS,
  payload: options,
});

export const openMenu = () => ({
  type: OPEN_HEADER_MENU,
});

export const closeMenu = () => ({
  type: CLOSE_HEADER_MENU,
});

export const setMenuState = isOpen => ({
  type: OPEN_HEADER_MENU,
  isOpen,
});
