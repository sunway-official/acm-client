import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql, gql, compose } from 'react-apollo';
import { View, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { Colors, Metrics } from 'Theme';
import { Text, UserAvatar, TouchableView } from 'Component';
import MUTATE_FOLLOW_USER from 'Graphql/mutation/followUser.graphql';
import MUTATE_UNFOLLOW_USER from 'Graphql/mutation/unfollowUser.graphql';
import styles from '../styles';

class Item extends Component {
  static propTypes = {
    following: PropTypes.object,
    enableFollowUser: PropTypes.bool,
    navigateToProfile: PropTypes.func,
    followUserMutation: PropTypes.func,
    unfollowUserMutation: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      follow: true,
    };

    this._renderFollowing = this._renderFollowing.bind(this);
    this._onFollowPress = this._onFollowPress.bind(this);
  }

  _onFollowPress(following) {
    const { followUserMutation, unfollowUserMutation } = this.props;
    this.setState({ follow: !this.state.follow }, async () => {
      if (this.state.follow) {
        await followUserMutation({
          variables: {
            user_id: following.following_id,
          },
        });
      } else {
        await unfollowUserMutation({
          variables: {
            user_id: following.following_id,
          },
        });
      }
    });
  }

  _renderFollowing(following) {
    const { navigateToProfile, enableFollowUser } = this.props;
    const { follow } = this.state;
    return (
      <TouchableView
        style={styles.followerContainer}
        onPress={() => navigateToProfile(following.following_id)}
      >
        <View style={styles.leftFollowerContainer}>
          <UserAvatar medium avatar={following.avatar} />
          <View marginHorizontal={Metrics.baseMargin}>
            <Text>
              {following.lastname} {following.firstname}
            </Text>
            <Text style={styles.numberOfFollowerText}>
              {following.followers_count} followers
            </Text>
          </View>
        </View>
        {/*{enableFollowUser && (*/}
        {/*<TouchableOpacity*/}
        {/*onPress={() => this._onFollowPress(following)}*/}
        {/*style={styles.rightFollowerContainer}*/}
        {/*>*/}
        {/*<Icon*/}
        {/*name={follow ? 'user-following' : 'user-follow'}*/}
        {/*type="simple-line-icon"*/}
        {/*color={follow ? Colors.red : Colors.black}*/}
        {/*size={18}*/}
        {/*/>*/}
        {/*</TouchableOpacity>*/}
        {/*)}*/}
      </TouchableView>
    );
  }

  render() {
    const { following } = this.props;
    return this._renderFollowing(following);
  }
}

export default compose()(Item);
// graphql(gql(MUTATE_FOLLOW_USER), {
//   name: 'followUserMutation',
// }),
// graphql(gql(MUTATE_UNFOLLOW_USER), {
//   name: 'unfollowUserMutation',
// }),
