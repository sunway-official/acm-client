import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, ImageBackground } from 'react-native';
import { Text, UserAvatar, LoadingIndicator } from 'Component';
import { Images } from 'Theme';
import styles from './styles';

class UserProfileHeader extends Component {
  static propTypes = {
    userQuery: PropTypes.shape({
      getUserByID: PropTypes.object,
    }),
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
    let { userQuery: { getUserByID: { avatar, gender } } } = this.props;
    return (
      <View style={styles.avatarSection}>
        <UserAvatar
          xlarge
          avatar={avatar}
          gender={gender}
          avatarStyle={styles.avatar}
        />
      </View>
    );
  }

  _renderInfo() {
    const {
      userQuery: { getUserByID: { firstname, lastname, organization } },
    } = this.props;
    return (
      <View style={styles.infoContainer}>
        <Text style={[styles.primaryTextColor, styles.username]} bold>
          {lastname} {firstname}
        </Text>
        <Text style={styles.primaryTextColor}>{organization}</Text>
      </View>
    );
  }

  _viewDimensions(layout) {
    const { height } = layout;
    this.setState({ headerHeight: height });
  }

  render() {
    const { userQuery: { getUserByID } } = this.props;

    return (
      <View style={{ height: this.state.headerHeight }}>
        {!getUserByID ? (
          <LoadingIndicator />
        ) : (
          <ImageBackground
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
          </ImageBackground>
        )}
      </View>
    );
  }
}

export default UserProfileHeader;
