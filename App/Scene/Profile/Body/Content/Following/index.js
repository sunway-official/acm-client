import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { View, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { Colors, Metrics } from '~/Theme';
import { Text, UserAvatar } from '~/Component';
import { FOLLOWING } from '~/Scene/Profile/fixture';
import styles from './styles';

class Following extends Component {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {
      followers: FOLLOWING,
    };
    this._renderFollower = this._renderFollower.bind(this);
    this._onFollowPress = this._onFollowPress.bind(this);
  }

  _onFollowPress(follower, index) {
    let followers = FOLLOWING;
    followers[index].followByMe = followers[index].followByMe ? false : true;
    this.setState({
      followers,
    });
  }

  _renderFollower(follower, index) {
    return (
      <View key={index} style={styles.followerContainer}>
        <View style={styles.leftFollowerContainer}>
          <UserAvatar medium avatar={follower.avatar} />
          <View marginHorizontal={Metrics.baseMargin}>
            <Text>{follower.username}</Text>
            <Text style={styles.numberOfFollowerText}>
              {follower.followers} followers
            </Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => this._onFollowPress(follower, index)}
          style={styles.rightFollowerContainer}
        >
          <Icon
            name={follower.followByMe ? 'user-following' : 'user-follow'}
            type="simple-line-icon"
            color={follower.followByMe ? Colors.red : Colors.black}
            size={18}
          />
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {FOLLOWING.map((follower, index) =>
          this._renderFollower(follower, index),
        )}
      </View>
    );
  }
}

export default Following;
