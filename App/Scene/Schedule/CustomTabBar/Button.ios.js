import React from 'react';
import { TouchableOpacity } from 'react-native';

const Button = props => {
  return (
    /* eslint-disable react/prop-types */
    <TouchableOpacity {...props}>
      {props.children}
    </TouchableOpacity>
    /* eslint-enable */
  );
};

module.exports = Button;
