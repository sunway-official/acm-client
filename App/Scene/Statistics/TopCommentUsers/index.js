import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, ScrollView } from 'react-native';
import { Colors, Metrics } from 'Theme';
import { Text, UserAvatar, LoadingIndicator, TouchableView } from 'Component';
import styles from './styles';
import GET_TOP_COMMENT_USERS from 'Graphql/query/getTopCommentUsers.graphql';
import QUERY_ME from 'Graphql/query/me.graphql';
import { compose, gql, graphql } from 'react-apollo';
import { NavigationActions } from 'Reduck/Navigation';

class TopCommentUsersStatistic extends Component {
  static propTypes = {};

  static _renderLoading() {
    return (
      <View style={styles.loadingContainer}>
        <LoadingIndicator />
      </View>
    );
  }

  constructor(props) {
    super(props);

    this._navigateToAttendeeProfile = this._navigateToAttendeeProfile.bind(
      this,
    );
  }

  _navigateToAttendeeProfile(userId) {
    const { queryMe, navigate } = this.props;
    if (userId === queryMe.me.id) {
      navigate('profile');
    } else {
      navigate('people', userId);
    }
  }

  _renderTopCommentUsers(user, index) {
    return (
      <View key={index} style={styles.userContainer}>
        <TouchableView
          onPress={() => this._navigateToAttendeeProfile(user.id)}
          style={styles.leftTopCommentUsersContainer}
        >
          <UserAvatar medium avatar={user.avatar} />
          <View marginHorizontal={Metrics.baseMargin}>
            <Text>{user.username}</Text>
            <Text style={styles.numberOfTopCommentUsersText}>
              {user.position}
            </Text>
          </View>
        </TouchableView>
        <View style={styles.rightTopCommentUsersContainer}>
          <Text>{user.newsComments.length} comments</Text>
        </View>
      </View>
    );
  }

  render() {
    if (this.props.data.loading) {
      return TopCommentUsersStatistic._renderLoading();
    }

    return (
      <View style={styles.container}>
        <ScrollView>
          {this.props.data.getTopCommentUsers.map((user, index) =>
            this._renderTopCommentUsers(user, index),
          )}
        </ScrollView>
      </View>
    );
  }
}

TopCommentUsersStatistic.header = {
  leftIcon: 'back',
  theme: 'dark',
  backgroundColor: Colors.primary,
  statusBarBackgroundColor: Colors.primary,
};

TopCommentUsersStatistic.propTypes = {
  data: PropTypes.object,
  navigate: PropTypes.func,
  queryMe: PropTypes.object,
};

const mapDispatchToProps = dispatch => ({
  navigate: (routeName, userId) =>
    dispatch(
      NavigationActions.navigate({
        routeName,
        params: { userId },
      }),
    ),
});

export default compose(
  connect(undefined, mapDispatchToProps),
  graphql(gql(GET_TOP_COMMENT_USERS)),
  graphql(gql(QUERY_ME), {
    name: 'queryMe',
  }),
)(TopCommentUsersStatistic);
