import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql, gql, compose } from 'react-apollo';
import { View, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { Colors, Metrics } from 'Theme';
import { Text, UserAvatar, TouchableView } from 'Component';
import MUTATE_FOLLOW_USER from 'Graphql/mutation/followUser.graphql';
import MUTATE_UNFOLLOW_USER from 'Graphql/mutation/unfollowUser.graphql';
import styles from './styles';

class Item extends Component {
  static propTypes = {
    follower: PropTypes.object,
    navigateToProfile: PropTypes.func,
    followUserMutation: PropTypes.func,
    unfollowUserMutation: PropTypes.func,
    enableFollowUser: PropTypes.bool,
  };

  constructor(props) {
    super(props);

    this.state = {
      follow: this.props.follower.is_following,
    };

    this._renderFollower = this._renderFollower.bind(this);
    this._onFollowPress = this._onFollowPress.bind(this);
  }

  _onFollowPress(follower) {
    const { followUserMutation, unfollowUserMutation } = this.props;
    this.setState({ follow: !this.state.follow }, async () => {
      if (this.state.follow) {
        await followUserMutation({
          variables: {
            user_id: follower.follower_id,
          },
        });
      } else {
        await unfollowUserMutation({
          variables: {
            user_id: follower.follower_id,
          },
        });
      }
    });
  }

  _renderFollower(follower) {
    const { navigateToProfile, enableFollowUser } = this.props;
    const { follow } = this.state;
    return (
      <TouchableView
        style={styles.followerContainer}
        onPress={() => navigateToProfile(follower.follower_id)}
      >
        <View style={styles.leftFollowerContainer}>
          <UserAvatar medium avatar={follower.avatar} />
          <View marginHorizontal={Metrics.baseMargin}>
            <Text>
              {follower.lastname} {follower.firstname}
            </Text>
            <Text style={styles.numberOfFollowerText}>
              {follower.followers_count} followers
            </Text>
          </View>
        </View>
        {enableFollowUser && (
          <TouchableOpacity
            onPress={() => this._onFollowPress(follower)}
            style={styles.rightFollowerContainer}
          >
            <Icon
              name={follow ? 'user-following' : 'user-follow'}
              type="simple-line-icon"
              color={follow ? Colors.red : Colors.black}
              size={18}
            />
          </TouchableOpacity>
        )}
      </TouchableView>
    );
  }

  render() {
    const { follower } = this.props;
    return this._renderFollower(follower);
  }
}

export default compose(
  graphql(gql(MUTATE_FOLLOW_USER), {
    name: 'followUserMutation',
  }),
  graphql(gql(MUTATE_UNFOLLOW_USER), {
    name: 'unfollowUserMutation',
  }),
)(Item);
