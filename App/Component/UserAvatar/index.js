import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Avatar } from 'react-native-elements';

const TYPE = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large',
  XLARGE: 'xlarge',
};

const UserAvatar = props => {
  const sourceAvatar =
    typeof props.avatar === 'number' ? props.avatar : { uri: props.avatar };
  return <Avatar {...props} rounded source={sourceAvatar} />;
};

UserAvatar.propTypes = {
  avatar: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  containerStyle: View.propTypes.style,
  overlayContainerStyle: View.propTypes.style,
};

export default UserAvatar;
