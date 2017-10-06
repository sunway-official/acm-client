// ? See more details
// ? https://material.io/guidelines/style/color.html#color-color-palette

const colors = {
  // core colors
  red: '#F44336',
  lightRed: '#FF8A80',
  pink: '#E91E63',
  lightPink: '#FF80AB',
  purple: '#9C27B0',
  lightPurple: '#EA80FC',
  deepPurple: '#673AB7',
  lightDeepPurple: '#B388FF',
  indigo: '#3F51B5',
  lightIndigo: '#8C9EFF',
  blue: '#2196F3',
  lightBlue: '#03A9F4',
  cyan: '#00BCD4',
  lightCyan: '#84FFFF',
  teal: '#009688',
  lightTeal: '#A7FFEB',
  green: '#4CAF50',
  lightGreen: '#B9F6CA',
  lime: '#CDDC39',
  lightLime: '#F4FF81',
  yellow: '#FFEB3B',
  lightYellow: '#FFFF8D',
  amber: '#FFC107',
  lightAmber: '#FFE57F',
  orange: '#FF9800',
  lightOrange: '#FFD180',
  deepOrange: '#FF5722',
  lightDeepOrange: '#FF9E80',
  brown: '#795548',
  lightBrown: '#D7CCC8',
  blueGrey: '#607D8B',
  black: '#000000',
  white: '#FFFFFF',
  transparent: 'rgba(0,0,0,0)',

  // custom colors
  grey: '#757575',
  darkGrey: '#494949',
  lightGrey: '#fafafa',
  lightDeepOrange: '#FFAB91', // 200
  darkDeepOrange: '#D84315', // 800
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
