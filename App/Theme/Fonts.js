import '~/Asset/Font';

const type = {
  light: 'roboto-light',
  regular: 'roboto-regular',
  bold: 'roboto-medium',
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
    fontFamily: type.light,
  },
  h2: {
    fontSize: size.h2,
    fontFamily: type.regular,
  },
  h3: {
    fontSize: size.h3,
    fontFamily: type.regular,
  },
  h4: {
    fontSize: size.h4,
    fontFamily: type.regular,
  },
  h5: {
    fontSize: size.h5,
    fontFamily: type.regular,
  },
  h6: {
    fontSize: size.h6,
    fontFamily: type.regular,
  },

  // ? See more details
  // ? https://material.io/guidelines/style/typography.html#
  appbarTitle: {
    fontSize: size.h6,
    fontFamily: type.bold,
  },
  button: {
    fontSize: size.medium,
    fontFamily: type.bold,
  },
  subheading: {
    fontSize: size.regular,
    fontFamily: type.regular,
  },
  body: {
    fontSize: size.medium,
    fontFamily: type.regular,
  },
};

export default {
  type,
  size,
  style,
};
