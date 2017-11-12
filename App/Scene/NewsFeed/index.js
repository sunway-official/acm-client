import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FlatList } from 'react-native';
import { compose, gql, graphql } from 'react-apollo';
import { View } from 'react-native';
import styles from './styles';
import { Colors } from '~/Theme';
import { News, LoadingIndicator } from '~/Component';
import NewsFeedFakePosting from './NewsFeedFakePosting';

import QUERY_ALL_NEWS from '~/Graphql/query/getAllNews.graphql';
import QUERY_ME from '~/Graphql/query/me.graphql';

// const isDuplicateNews = (newNews, existingNews) => {
//   if (existingNews !== undefined) {
//     return (
//       newNews.id !== null &&
//       existingNews.some(oldNews => newNews.id === oldNews.id)
//     );
//   }
// };

const PAGE_SIZE = 10;

class NewsFeedScene extends Component {
  static propTypes = {
    allNews: PropTypes.array,
    me: PropTypes.object.isRequired,
    networkStatus: PropTypes.number,
    refetch: PropTypes.func,
    fetchMore: PropTypes.func,
    home: PropTypes.func,
    setTitle: PropTypes.func,
    toggleHeader: PropTypes.func,
    toggleFooter: PropTypes.func,
  };

  static header = {
    leftIcon: 'drawer',
    theme: 'dark',
    backgroundColor: Colors.primary,
    statusBarBackgroundColor: Colors.primary,
  };

  static footer = {
    show: true,
    activeColor: Colors.primary,
  };

  constructor(props) {
    super(props);

    this._onRefresh = this._onRefresh.bind(this);
    this._onEndReached = this._onEndReached.bind(this);
  }

  _onRefresh() {
    this.props.refetch();
  }

  _onEndReached(allNews) {
    let pageNumber = Math.floor(allNews.length / PAGE_SIZE + 1);

    this.props.fetchMore({
      variables: { pageNumber: pageNumber },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult || fetchMoreResult.getAllNews.length === 0) {
          return previousResult;
        }

        return {
          getAllNews: previousResult.getAllNews.concat(
            fetchMoreResult.getAllNews,
          ),
        };
      },
    });
  }

  _renderNewsFeedFakePosting(me) {
    return (
      <NewsFeedFakePosting
        avatar={me.avatar}
        userId={me.id}
        username={`${me.firstname} ${me.lastname}`}
      />
    );
  }

  _renderNewsFeedList(allNews, networkStatus, me) {
    return (
      <FlatList
        data={allNews}
        refreshing={networkStatus === 4}
        renderItem={({ item, index }) => (
          <News
            item={item}
            key={index}
            userId={me.id}
            onRefresh={this._onRefresh}
          />
        )}
        keyExtractor={(item, index) => index}
        onRefresh={this._onRefresh}
        onEndReachedThreshold={0.8}
        onEndReached={() => this._onEndReached(allNews)}
      />
    );
  }

  render() {
    const { allNews, networkStatus, me } = this.props;

    if (networkStatus === 1) {
      return (
        <View style={styles.loadingContainer}>
          <LoadingIndicator />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        {this._renderNewsFeedFakePosting(me)}
        {this._renderNewsFeedList(allNews, networkStatus, me)}
      </View>
    );
  }
}

const MeQuery = graphql(gql(QUERY_ME), {
  props: ({ data: { loading, me } }) => ({
    loading,
    me,
  }),
});

const AllNewsQuery = graphql(gql(QUERY_ALL_NEWS), {
  props: ({ data: { getAllNews, refetch, networkStatus, fetchMore } }) => ({
    allNews: getAllNews,
    refetch,
    networkStatus,
    fetchMore,
  }),
  options: {
    notifyOnNetworkStatusChange: true,
    variables: { pageNumber: 0, pageSize: PAGE_SIZE },
  },
});

export default compose(AllNewsQuery, MeQuery)(NewsFeedScene);
