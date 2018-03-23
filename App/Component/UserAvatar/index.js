import React from 'react';
import PropTypes from 'prop-types';
import { ViewPropTypes } from 'react-native';
import { Avatar } from 'react-native-elements';
import { Images } from 'Theme';
import { HTTP_URL_REGEX } from 'Lib/constants';
import { S3_GET_PREFIX } from 'env';

const TYPES = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large',
  XLARGE: 'xlarge',
};

const GENDER_MALE = 'male';
const GENDER_FEMALE = 'female';
const GENDER_UNKNOWN = 'unknown';

const UserAvatar = ({ avatar, gender, rounded, ...others }) => {
  let sourceAvatar;
  let defaultAvatar = Images.avatar['male02'];
  if (avatar) {
    const avatarUri = HTTP_URL_REGEX.test(avatar)
      ? avatar
      : S3_GET_PREFIX + avatar;

    sourceAvatar = typeof avatar === 'number' ? avatar : { uri: avatarUri };
  } else {
    switch (gender) {
      case GENDER_MALE:
        defaultAvatar = Images.avatar['male08'];
        break;
      case GENDER_FEMALE:
        defaultAvatar = Images.avatar['female01'];
        break;
    }
    sourceAvatar = defaultAvatar;
  }

  return <Avatar rounded={rounded} {...others} source={sourceAvatar} />;
};

UserAvatar.propTypes = {
  avatar: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  gender: PropTypes.oneOf([GENDER_MALE, GENDER_FEMALE, GENDER_UNKNOWN]),
  rounded: PropTypes.bool,
  containerStyle: ViewPropTypes.style,
  overlayContainerStyle: ViewPropTypes.style,
};

UserAvatar.defaultProps = {
  rounded: true,
};

// Loop through TYPES to define its propTypes
Object.keys(TYPES).map(key => {
  UserAvatar.propTypes[TYPES[key]] = PropTypes.bool;
});

export default UserAvatar;
