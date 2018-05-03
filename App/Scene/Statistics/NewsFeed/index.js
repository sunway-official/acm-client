import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView } from 'react-native';
import { Colors, Metrics } from 'Theme';
import { Text, UserAvatar, LoadingIndicator } from 'Component';
import styles from './styles';
import GET_TOP_COMMENT_USERS from 'Graphql/query/getTopCommentUsers.graphql';
import { compose, gql, graphql } from 'react-apollo';

class NewsFeed extends Component {
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
    this._renderTopCommentUsers = this._renderTopCommentUsers.bind(this);
  }

  static _renderTopCommentUsers(user, index) {
    return (
      <View key={index} style={styles.userContainer}>
        <View style={styles.leftNewsFeedContainer}>
          <UserAvatar medium avatar={user.avatar} />
          <View marginHorizontal={Metrics.baseMargin}>
            <Text>{user.username}</Text>
            <Text style={styles.numberOfNewsFeedText}>{user.position}</Text>
          </View>
        </View>
        <View style={styles.rightNewsFeedContainer}>
          <Text>{user.newsComments.length} comments</Text>
        </View>
      </View>
    );
  }

  render() {
    if (this.props.data.loading) {
      return NewsFeed._renderLoading();
    }

    return (
      <View style={styles.container}>
        <ScrollView>
          {this.props.data.getTopCommentUsers.map((user, index) =>
            NewsFeed._renderTopCommentUsers(user, index),
          )}
        </ScrollView>
      </View>
    );
  }
}

NewsFeed.header = {
  leftIcon: 'back',
  theme: 'dark',
  backgroundColor: Colors.primary,
  statusBarBackgroundColor: Colors.primary,
};

NewsFeed.propTypes = {
  data: PropTypes.object,
};

export default compose(graphql(gql(GET_TOP_COMMENT_USERS)))(NewsFeed);