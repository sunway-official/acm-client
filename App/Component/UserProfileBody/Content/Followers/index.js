import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { graphql, gql, compose } from 'react-apollo';
import { NavigationActions } from 'Reduck/Navigation';
import { View, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { Colors, Metrics } from 'Theme';
import { Text, UserAvatar, TouchableView, LoadingIndicator } from 'Component';
import QUERY_ME from 'Graphql/query/me.graphql';
import styles from './styles';

class Follower extends Component {
  static propTypes = {
    navigate: PropTypes.func,
    tabContent: PropTypes.object,
    queryMe: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this._renderFollower = this._renderFollower.bind(this);
    this._onFollowPress = this._onFollowPress.bind(this);
  }

  _onFollowPress(follower, index) {
    // let followers = FOLLOWERS;
    // followers[index].followByMe = !followers[index].followByMe;
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

  _renderFollower(follower, index) {
    const { navigate } = this.props;

    return (
      <TouchableView
        key={index}
        style={styles.followerContainer}
        onPress={() =>
          navigate(
            this._navigateToCurentUserProfile(follower.follower_id)
              ? 'profile'
              : 'people',
            this._navigateToCurentUserProfile(follower.follower_id) ||
              follower.follower_id,
          )
        }
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
        <TouchableOpacity
          onPress={() => this._onFollowPress(follower, index)}
          style={styles.rightFollowerContainer}
        >
          <Icon
            name={'user-follow'}
            type="simple-line-icon"
            color={Colors.black}
            size={18}
          />
        </TouchableOpacity>
      </TouchableView>
    );
  }

  render() {
    const {
      tabContent: { getFollowers },
    } = this.props;
    return (
      <View style={styles.container}>
        {!getFollowers ? (
          <LoadingIndicator />
        ) : (
          getFollowers.map((follower, index) =>
            this._renderFollower(follower, index),
          )
        )}
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  navigate: (routeName, followerId) =>
    dispatch(
      NavigationActions.navigate({
        routeName,
        params: { userId: followerId },
      }),
    ),
});

export default compose(
  connect(undefined, mapDispatchToProps),
  graphql(gql(QUERY_ME), {
    name: 'queryMe',
  }),
)(Follower);
