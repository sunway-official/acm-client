import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Badge } from 'react-native-elements';
import { Colors, Metrics } from '~/Theme';
import { Text, UserAvatar } from '~/Component';
import { FOLLOWERS } from '~/Scene/Profile/fixture';
import styles from './styles';

class Follower extends Component {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {
      follow: true,
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
            <Text>
              {follower.username}
            </Text>
            <Text style={styles.numberOfFollowerText}>
              {follower.FOLLOWERS} followers
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
        {FOLLOWERS.map((follower, index) =>
          this._renderFollower(follower, index),
        )}
      </View>
    );
  }
}

export default Follower;
