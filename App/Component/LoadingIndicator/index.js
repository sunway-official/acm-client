import React from 'react';
import { ActivityIndicator } from 'react-native';
import { Colors } from 'Theme';
import { IS_ANDROID } from 'env';

const LoadingIndicator = ({ ...others }) => (
  <ActivityIndicator color={Colors.primary} {...others} />
);

LoadingIndicator.propTypes = {};

export default (IS_ANDROID ? LoadingIndicator : ActivityIndicator);
