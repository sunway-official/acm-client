import React from 'react';
import PropTypes from 'prop-types';
import { Linking } from 'react-native';
import Text from '../Text';
import styles from './styles';

const AnchorText = ({ href, children, style, ...props }) => {
  return (
    <Text
      onPress={() => Linking.openURL(href)}
      style={[styles.hrefText, style]}
      {...props}
    >
      {children || href}
    </Text>
  );
};

AnchorText.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.string,
  style: Text.propTypes.style,
};

export default AnchorText;
