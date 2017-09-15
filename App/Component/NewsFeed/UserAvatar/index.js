import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Avatar } from 'react-native-elements';

class UserAvatar extends Component {
  static propTypes = { avatar: PropTypes.string };

  render() {
    const { avatar } = this.props;
    return (
      <Avatar
        small
        rounded
        source={{
          uri: avatar,
        }}
      />
    );
  }
}

export default UserAvatar;
