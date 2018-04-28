import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavigationActions } from 'Reduck/Navigation';
import { connect } from 'react-redux';
import { graphql, gql, compose } from 'react-apollo';
import { View, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { Colors, Metrics } from 'Theme';
import { Text, UserAvatar, TouchableView } from 'Component';
import QUERY_ME from 'Graphql/query/me.graphql';
import styles from './styles';

class Following extends Component {
  static propTypes = {
    tabContent: PropTypes.object,
    queryMe: PropTypes.object,
    navigate: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this._renderFollower = this._renderFollower.bind(this);
    this._onFollowPress = this._onFollowPress.bind(this);
  }

  _onFollowPress(follower, index) {
    // let followers = FOLLOWING;
    // followers[index].followByMe = followers[index].followByMe ? false : true;
    // this.setState({
    //   followers,
    // });
  }

  _navigateToCurentUserProfile(userId) {
    const { queryMe } = this.props;
    if (userId === queryMe.me.id) {
      return true;
    }
    return false;
  }

  _renderFollower(following, index) {
    const { navigate } = this.props;

    return (
      <TouchableView
        key={index}
        style={styles.followerContainer}
        onPress={() =>
          navigate(
            this._navigateToCurentUserProfile(following.following_id)
              ? 'profile'
              : 'people',
            this._navigateToCurentUserProfile(following.following_id) ||
              following.following_id,
          )
        }
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
        <TouchableOpacity
          onPress={() => this._onFollowPress(following, index)}
          style={styles.rightFollowerContainer}
        >
          <Icon
            name={'user-following'}
            type="simple-line-icon"
            color={Colors.red}
            size={18}
          />
        </TouchableOpacity>
      </TouchableView>
    );
  }

  render() {
    const {
      tabContent: { getFollowings },
    } = this.props;
    return (
      <View style={styles.container}>
        {getFollowings.map((following, index) =>
          this._renderFollower(following, index),
        )}
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  navigate: (routeName, followingId) =>
    dispatch(
      NavigationActions.navigate({
        routeName,
        params: { userId: followingId },
      }),
    ),
});

export default compose(
  connect(undefined, mapDispatchToProps),
  graphql(gql(QUERY_ME), {
    name: 'queryMe',
  }),
)(Following);
