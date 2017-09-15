export const TOGGLE_HEADER = 'TOGGLE_HEADER';
export const SET_HEADER_STATE = 'SET_HEADER_STATE';
export const TOGGLE_FOOTER = 'TOGGLE_FOOTER';
export const SET_FOOTER_STATE = 'SET_FOOTER_STATE';
export const SET_HEADER_OPTIONS = 'SET_HEADER_OPTIONS';
export const SET_FOOTER_OPTIONS = 'SET_FOOTER_OPTIONS';

export const toggleHeader = () => ({
  type: TOGGLE_HEADER,
});

export const setHeaderState = isOpen => ({
  type: SET_HEADER_STATE,
  isOpen,
});

export const toggleFooter = () => ({
  type: TOGGLE_FOOTER,
});

export const setFooterState = isOpen => ({
  type: SET_FOOTER_STATE,
  isOpen,
});

export const setHeaderOptions = options => ({
  type: SET_HEADER_OPTIONS,
  payload: options,
});

export const setFooterOptions = options => ({
  type: SET_FOOTER_OPTIONS,
  payload: options,
});
