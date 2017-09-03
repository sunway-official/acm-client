const type = {
  base: 'normal',
  lighter: '100',
  bold: '700',
  emphasis: '',
};

const size = {
  h1: 112,
  h2: 56,
  h3: 45,
  h4: 34,
  h5: 24,
  h6: 20,
  regular: 16,
  medium: 14,
  small: 12,
};

const style = {
  h1: {
    fontSize: size.h1,
    fontWeight: type.lighter,
  },
  h2: {
    fontSize: size.h2,
    fontWeight: type.base,
  },
  h3: {
    fontSize: size.h3,
    fontWeight: type.base,
  },
  h4: {
    fontSize: size.h4,
    fontWeight: type.base,
  },
  h5: {
    fontSize: size.h5,
    fontWeight: type.base,
  },
  h6: {
    fontSize: size.h6,
    fontWeight: type.base,
  },

  // ? See more details
  // ? https://material.io/guidelines/style/typography.html#
  appbarTitle: {
    fontSize: size.h6,
    fontWeight: type.bold,
  },
  button: {
    fontSize: size.medium,
    fontWeight: type.bold,
  },
  subheading: {
    fontSize: size.regular,
    fontWeight: type.base,
  },
  body: {
    fontSize: size.medium,
    fontWeight: type.base,
  },
};

export default {
  type,
  size,
  style,
};
