const colors = {
  turquoise: '#1abc9c',
  greenSea: '#16a085',
  emerald: '#2ecc71',
  nephritis: '#27ae60',
  peterRiver: '#3498db',
  belizeHole: '#2980b9',
  amethyst: '#9b59b6',
  wisteria: '#8e44ad',
  wetAsphalt: '#34495e',
  midnightBlue: '#2c3e50',
  sunFlower: '#f1c40f',
  orange: '#f39c12',
  carrot: '#e67e22',
  pumpkin: '#d35400',
  alizarin: '#e74c3c',
  pomegranate: '#c0392b',
  cloudes: '#ecf0f1',
  silver: '#bdc3c7',
  concrete: '#95a5a6',
  asbestos: '#7f8c8d',
  inverse: '#081c24',
};

const defaultColor = {
  primary: colors.emerald,
  primaryDark: colors.nephritis,
  secondary: colors.cloudes,
  secondaryDark: colors.silver,
  success: colors.emerald,
  successDark: colors.nephritis,
  warning: colors.sunFlower,
  warningDark: colors.orange,
  info: colors.peterRiver,
  infoDark: colors.belizeHole,
  danger: colors.alizarin,
  dangerDark: colors.pomegranate,
};

export default {
  ...colors,
  ...defaultColor
};
