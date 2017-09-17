import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Avatar, Badge } from 'react-native-elements';
import { Colors, Metrics } from '../../../../../Theme';
import { Text, UserAvatar } from '~/Component';
import { followers } from '~/Scene/Profile/fixture';
import styles from './styles';

class Follower extends Component {
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
      <View key={index} style={styles.followerContainer}>
        <View style={styles.leftOfFollowerContainer}>
          <UserAvatar medium avatar={follower.avatar} />
          <View marginHorizontal={Metrics.baseMargin}>
            <Text bold>
              {follower.username}
            </Text>
            <Text style={styles.numberOfFollowerText}>
              {follower.followers} followers
            </Text>
          </View>
        </View>
        <Badge
          value={this.state.follow ? 'Following' : 'Follow'}
          textStyle={{ color: this.state.follow ? Colors.red : Colors.white }}
          containerStyle={[
            styles.badgeContainer,
            {
              backgroundColor: this.state.follow ? 'transparent' : Colors.red,
            },
          ]}
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

export default Follower;
