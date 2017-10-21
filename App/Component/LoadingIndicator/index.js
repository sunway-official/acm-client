import React from 'react';
import { ActivityIndicator } from 'react-native';
import { Colors } from '~/Theme';

const LoadingIndicator = ({ ...others }) => (
  <ActivityIndicator color={Colors.primary} {...others} />
);

LoadingIndicator.propTypes = {};

export default LoadingIndicator;
