import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Avatar } from 'react-native-elements';
import { HTTP_URL_REGEX } from '~/Lib/constants';
import { S3_GET_PREFIX } from '~/env';

const TYPES = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large',
  XLARGE: 'xlarge',
};

const UserAvatar = props => {
  const avatarUri = HTTP_URL_REGEX.test(props.avatar)
    ? props.avatar
    : S3_GET_PREFIX + props.avatar;

  const sourceAvatar =
    typeof props.avatar === 'number' ? props.avatar : { uri: avatarUri };

  return <Avatar {...props} rounded source={sourceAvatar} />;
};

UserAvatar.propTypes = {
  avatar: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  containerStyle: View.propTypes.style,
  overlayContainerStyle: View.propTypes.style,
};

// Loop throght TYPES to define its proptypes
Object.keys(TYPES).map(key => {
  UserAvatar.propTypes[TYPES[key]] = PropTypes.bool;
});

export default UserAvatar;
