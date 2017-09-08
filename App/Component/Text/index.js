import React, { PureComponent } from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';
import styles from './style';

const FONT_FAMILY = 'roboto';

const TYPES = {
  REGULAR: 'regular',
  BOLD: 'bold',
  LIGHT: 'light',
  MEDIUM: 'medium',
  THIN: 'thin',
  BLACK: 'black',
  ITALIC: 'italic',
};

class RobotoText extends PureComponent {
  static propTypes = {
    [TYPES.BOLD]: PropTypes.bool,
    [TYPES.LIGHT]: PropTypes.bool,
    [TYPES.MEDIUM]: PropTypes.bool,
    [TYPES.THIN]: PropTypes.bool,
    [TYPES.BLACK]: PropTypes.bool,
    [TYPES.ITALIC]: PropTypes.bool,
    style: PropTypes.any,
  };
  render() {
    /* eslint-disable react/prop-types */
    const { italic, style } = this.props;
    /* eslint-enable react/prop-types */

    let fontFamily = FONT_FAMILY + '-';
    // Handle BOLD LIGHT MEDIUM THIN BLACK type
    for (let key in TYPES) {
      const type = TYPES[key];
      if (type === TYPES.ITALIC || type === TYPES.REGULAR) continue;
      if (this.props[type] === true) {
        fontFamily += type;
        break;
      }
    }
    // Handle REGULAR type
    if (fontFamily[fontFamily.length - 1] === '-') {
      fontFamily += TYPES.REGULAR;
    }
    // Handle ITALIC type
    if (italic === true) {
      if (fontFamily.includes(TYPES.REGULAR)) {
        fontFamily = FONT_FAMILY + '-' + TYPES.ITALIC;
      } else {
        fontFamily += '-' + TYPES.ITALIC;
      }
    }

    const textStyle = {
      fontFamily,
    };
    let styleProp = [];
    if (typeof style === 'array') {
      styleProp = [...style];
    } else {
      styleProp = [style];
    }
    return (
      <Text {...this.props} style={[styles.text, textStyle, ...styleProp]} />
    );
  }
}

export default RobotoText;
