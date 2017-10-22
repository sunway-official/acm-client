import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FlatList } from 'react-native';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { View } from 'react-native';
import styles from './styles';
import { Colors } from '~/Theme';
import { News, LoadingIndicator } from '~/Component';
import NewsFeedPosting from './NewsFeedPosting';

import ALL_NEWS_QUERY from '~/Graphql/query/getAllNews.graphql';
import ME_QUERY from '~/Graphql/query/me.graphql';

class NewsFeedScene extends Component {
  constructor(props) {
    super(props);

    this.onRefresh = this.onRefresh.bind(this);
  }

  onRefresh() {
    this.props.refetch();
  }

  render() {
    const { loading, allNews, networkStatus, me } = this.props;
    const username = `${me.firstname} ${me.lastname}`;

    if (loading) {
      return (
        <View style={styles.loadingContainer}>
          <LoadingIndicator />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <NewsFeedPosting userId={me.id} username={username} />
        <FlatList
          data={allNews}
          renderItem={({ item, index }) => (
            <News item={item} key={index} userId={me.id} />
          )}
          keyExtractor={(item, index) => index}
          onRefresh={this.onRefresh}
          refreshing={networkStatus === 4}
        />
      </View>
    );
  }
}

NewsFeedScene.propTypes = {
  home: PropTypes.func,
  setTitle: PropTypes.func,
  toggleHeader: PropTypes.func,
  toggleFooter: PropTypes.func,
  loading: PropTypes.bool.isRequired,
  allNews: PropTypes.array,
  refetch: PropTypes.func,
  networkStatus: PropTypes.number,
  error: PropTypes.object,
  me: PropTypes.object,
};

NewsFeedScene.header = {
  leftIcon: 'drawer',
  theme: 'dark',
  backgroundColor: Colors.primary,
  statusBarBackgroundColor: Colors.primary,
};

NewsFeedScene.footer = {
  show: true,
  activeColor: Colors.primary,
};

const MeQuery = graphql(gql(ME_QUERY), {
  props: ({ data: { loading, me } }) => ({
    loading,
    me,
  }),
});

const AllNewsQuery = graphql(gql(ALL_NEWS_QUERY), {
  props: ({
    data: { loading, getAllNews, refetch, networkStatus, error },
  }) => ({
    loading,
    allNews: getAllNews,
    refetch,
    networkStatus,
    error,
  }),
});

export default compose(AllNewsQuery, MeQuery)(NewsFeedScene);
