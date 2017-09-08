import React from 'react';
import { TouchableNativeFeedback } from 'react-native';

const Button = props => {
  return (
    <TouchableNativeFeedback
      delayPressIn={0}
      background={TouchableNativeFeedback.SelectableBackground()} // eslint-disable-line new-cap
      {...props}
    >
      {/* eslint-disable react/prop-types*/}
      {props.children}
    </TouchableNativeFeedback>
  );
};

module.exports = Button;
