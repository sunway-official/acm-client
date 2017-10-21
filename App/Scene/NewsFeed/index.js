import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FlatList } from 'react-native';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { View } from 'react-native';
import styles from './styles';
import { Colors } from '~/Theme';
import { News, LoadingIndicator } from '~/Component';
import NewsFeedPosting from './NewsFeedPosting';

import NEWS_FEED_QUERY from '~/Graphql/query/getAllNews.graphql';

class NewsFeedScene extends Component {
  constructor(props) {
    super(props);

    this.onRefresh = this.onRefresh.bind(this);
  }

  onRefresh() {
    this.props.refetch();
  }

  render() {
    const { loading, allNews, networkStatus } = this.props;

    if (loading) {
      return (
        <View style={styles.loadingContainer}>
          <LoadingIndicator />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <NewsFeedPosting />
        <FlatList
          data={allNews}
          renderItem={({ item, index }) => <News item={item} key={index} />}
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

const NewsFeedSceneWithData = graphql(gql(NEWS_FEED_QUERY), {
  props: ({
    data: { loading, getAllNews, refetch, networkStatus, error },
  }) => ({
    loading,
    allNews: getAllNews,
    refetch,
    networkStatus,
    error,
  }),
})(NewsFeedScene);

export default NewsFeedSceneWithData;
