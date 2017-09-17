import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'react-native-elements';
import { View, Image } from 'react-native';
import { Text } from '~/Component';
import { Images, Colors } from '~/Theme';
import styles from './styles';

class Header extends Component {
  static propTypes = {
    avatar: PropTypes.string,
    username: PropTypes.string,
    address: PropTypes.string,
  };

  constructor(props, context) {
    super(props, context);
    this._renderAvatar = this._renderAvatar.bind(this);
    this._renderInfo = this._renderInfo.bind(this);
  }

  _renderIcon({ name, type, color, style }) {
    return (
      <View style={styles.iconContainer}>
        <Icon
          name={name}
          type={type}
          color={color}
          size={23}
          style={[styles.icon, styles.centerScale, style]}
        />
      </View>
    );
  }

  _renderAvatar() {
    return <Image source={{ uri: this.props.avatar }} style={styles.avatar} />;
  }

  _renderInfo() {
    const { username, address } = this.props;
    return (
      <View style={styles.infoContainer}>
        <Text style={styles.username} bold>
          {username}
        </Text>
        <Text>
          {address}
        </Text>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.fakeView}>
          <Image
            source={Images.materialBackground}
            style={{ width: '100%', height: '100%' }}
          />
          <View style={styles.coverPhoto} />
        </View>
        <View style={styles.avatarSection}>
          {this._renderIcon({
            name: 'email',
            type: 'material-community',
            color: Colors.white,
            style: {
              backgroundColor: Colors.primary,
            },
          })}
          {this._renderAvatar()}
          {this._renderIcon({
            name: 'lead-pencil',
            type: 'material-community',
            color: Colors.white,
            style: { backgroundColor: Colors.blue },
          })}
        </View>
        {this._renderInfo()}
      </View>
    );
  }
}

export default Header;
