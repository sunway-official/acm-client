// ? See more details
// ? https://material.io/guidelines/style/color.html#color-color-palette

const colors = {
  // core colors
  red: '#F44336',
  pink: '#E91E63',
  purple: '#9C27B0',
  deepPurple: '#673AB7',
  indigo: '#3F51B5',
  blue: '#2196F3',
  lightBlue: '#03A9F4',
  cyan: '#00BCD4',
  teal: '#009688',
  green: '#4CAF50',
  lightGreen: '#8BC34A',
  lime: '#CDDC39',
  yellow: '#FFEB3B',
  amber: '#FFC107',
  orange: '#FF9800',
  deepOrange: '#FF5722',
  brown: '#795548',
  grey: '#9E9E9E',
  blueGrey: '#607D8B',
  black: '#000000',
  white: '#FFFFFF',

  // custom colors
  lightDeepOrange: '#FFAB91', // 200
  darkDeepOrange: '#D84315', // 800
  lightGrey: '#EEEEEE', // 200
  darkGrey: '#BCBCBC',
  darkRed: '#C62828', // 800
};

const defaultColor = {
  primary: colors.deepOrange,
  primaryLight: colors.lightDeepOrange,
  primaryDark: colors.darkDeepOrange,
  secondary: colors.lightGrey,
  secondaryLight: colors.white,
  secondaryDark: colors.darkGrey,
  success: colors.deepOrange,
  successDark: colors.darkDeepOrange,
  warning: colors.sunFlower,
  warningDark: colors.orange,
  info: colors.peterRiver,
  infoDark: colors.belizeHole,
  danger: colors.red,
  dangerDark: colors.darkRed,
  textColor: colors.white,
};

export default {
  ...colors,
  ...defaultColor,
};
