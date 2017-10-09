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
  return (
    <Avatar
      {...props}
      rounded
      source={{
        uri: props.avatar,
      }}
    />
  );
};

UserAvatar.propTypes = {
  [TYPE.KEY]: PropTypes.string,
  avatar: PropTypes.string,
  containerStyle: View.propTypes.style,
  overlayContainerStyle: View.propTypes.style,
};

export default UserAvatar;
