import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Avatar } from 'react-native-elements';
import { S3_GET_PREFIX } from '~/env';

const TYPE = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large',
  XLARGE: 'xlarge',
};

const UserAvatar = props => {
  const sourceAvatar =
    typeof props.avatar === 'number'
      ? props.avatar
      : { uri: S3_GET_PREFIX + props.avatar };
  return <Avatar {...props} rounded source={sourceAvatar} />;
};

UserAvatar.propTypes = {
  [TYPE.KEY]: PropTypes.string,
  avatar: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  containerStyle: View.propTypes.style,
  overlayContainerStyle: View.propTypes.style,
};

export default UserAvatar;
