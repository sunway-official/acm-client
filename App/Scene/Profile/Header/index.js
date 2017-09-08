import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'react-native-elements';
import { View, Image, TouchableOpacity } from 'react-native';
import { Text } from '~/Component';
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

  _renderIcon(text, name, type, color, style) {
    return (
      <View style={styles.iconContainer}>
        <Icon name={name} type={type} color={color} style={style} />
        <Text>
          {text}
        </Text>
      </View>
    );
  }

  _renderAvatar(style) {
    return (
      <Image
        source={{
          uri: this.props.avatar,
        }}
        style={style}
      />
    );
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
        <View style={styles.fakeView} />
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 36,
          }}
        >
          {this._renderIcon('EMAIL', 'email', 'material-community', 'red', [
            styles.icon,
            styles.centerScale,
            { borderColor: 'red' },
          ])}
          {this._renderIcon(
            'EDIT',
            'lead-pencil',
            'material-community',
            'blue',
            [styles.icon, styles.centerScale, { borderColor: 'blue' }],
          )}
        </View>
        <View style={{ alignItems: 'center' }}>
          {this._renderAvatar(styles.avatar)}
        </View>
        {this._renderInfo()}
      </View>
    );
  }
}

export default Header;
