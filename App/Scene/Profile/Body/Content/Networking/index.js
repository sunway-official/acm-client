import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Avatar, Badge } from 'react-native-elements';
import { Text } from '~/Component';
import followers from './fixture';

class Networking extends Component {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {
      follow: false,
    };
    this._renderFollower = this._renderFollower.bind(this);
    this._handleFollowPress = this._handleFollowPress.bind(this);
  }

  _handleFollowPress() {
    this.setState({ follow: !this.state.follow });
  }

  _renderFollower(follower, index) {
    return (
      <View
        key={index}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: 'white',
          padding: 8,
          marginBottom: 1,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Avatar
            medium
            rounded
            source={{
              uri: follower.avatar,
            }}
          />
          <View marginHorizontal={8}>
            <Text bold>
              {follower.username}
            </Text>
            <Text style={{ color: 'grey', fontSize: 12, marginTop: 4 }}>
              {follower.followers} followers
            </Text>
          </View>
        </View>
        <Badge
          value={this.state.follow ? 'Following' : 'Follow'}
          textStyle={{ color: this.state.follow ? 'red' : 'white' }}
          containerStyle={{
            borderWidth: 1,
            borderColor: 'red',
            backgroundColor: this.state.follow ? 'transparent' : 'red',
          }}
          onPress={() => this._handleFollowPress()}
        />
      </View>
    );
  }

  render() {
    return (
      <View>
        {followers.map((follower, index) =>
          this._renderFollower(follower, index),
        )}
      </View>
    );
  }
}

export default Networking;
