import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Image } from 'react-native';
import { Text } from '~/Component';
import { Images } from '~/Theme';
import { S3_GET_PREFIX } from '~/env';
import styles from './styles';

/* eslint-disable no-unused-vars */
const GENDER_MALE = 'male';
const GENDER_FEMALE = 'female';
const GENDER_UNKNOWN = 'unknown';
/* eslint-enable no-unused-vars */
class Header extends Component {
  static propTypes = {
    user: PropTypes.object,
    address: PropTypes.string,
  };

  static defaultProps = {
    user: {
      firstname: 'Sunway',
      lastname: 'Team',
    },
  };

  constructor(props) {
    super(props);

    this.state = {
      headerHeight: 500,
    };

    this._renderAvatar = this._renderAvatar.bind(this);
    this._renderInfo = this._renderInfo.bind(this);
    this._viewDimensions = this._viewDimensions.bind(this);
  }

  _renderAvatar() {
    let { user: { avatar, gender } } = this.props;
    let defaultAvatar = Images.avatar['male02'];
    if (avatar) {
      avatar = { uri: S3_GET_PREFIX + avatar };
    } else {
      switch (gender) {
        case GENDER_MALE:
          defaultAvatar = Images.avatar['male08'];
          break;
        case GENDER_FEMALE:
          defaultAvatar = Images.avatar['female01'];
          break;
      }
      avatar = defaultAvatar;
    }
    return (
      <View style={styles.avatarSection}>
        <Image
          source={avatar}
          defaultSource={Images.default['img200']}
          style={styles.avatar}
        />
      </View>
    );
  }

  _renderInfo() {
    const { user } = this.props;
    return (
      <View style={styles.infoContainer}>
        <Text style={[styles.primaryTextColor, styles.username]} bold>
          {user.firstname} {user.lastname}
        </Text>
        <Text style={styles.primaryTextColor}>{user.organization}</Text>
      </View>
    );
  }

  _viewDimensions(layout) {
    const { height } = layout;
    this.setState({ headerHeight: height });
  }

  render() {
    return (
      <View style={{ height: this.state.headerHeight }}>
        <Image
          source={Images.materialBackground}
          style={styles.backgroundImage}
        >
          <View
            style={styles.coverPhoto}
            onLayout={event => this._viewDimensions(event.nativeEvent.layout)}
          >
            {this._renderAvatar()}
            {this._renderInfo()}
          </View>
        </Image>
      </View>
    );
  }
}

export default Header;
