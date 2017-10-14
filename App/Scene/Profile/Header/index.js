import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Image } from 'react-native';
import { Text } from '~/Component';
import { Images } from '~/Theme';
import styles from './styles';

class Header extends Component {
  static propTypes = {
    avatar: PropTypes.string,
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
    return (
      <View style={styles.avatarSection}>
        <Image source={{ uri: this.props.avatar }} style={styles.avatar} />
      </View>
    );
  }

  _renderInfo() {
    const { address, user } = this.props;
    return (
      <View style={styles.infoContainer}>
        <Text style={[styles.primaryTextColor, styles.username]} bold>
          {user.firstname} {user.lastname}
        </Text>
        <Text style={styles.primaryTextColor}>
          {address}
        </Text>
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
