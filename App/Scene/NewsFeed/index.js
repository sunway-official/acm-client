import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FlatList } from 'react-native';
import { compose, gql, graphql } from 'react-apollo';
import { View } from 'react-native';
import { S3 } from '~/Provider';
import styles from './styles';
import { Colors } from '~/Theme';
import { News, LoadingIndicator } from '~/Component';
import NewsFeedPosting from './NewsFeedPosting';

import QUERY_ALL_NEWS from '~/Graphql/query/getAllNews.graphql';
import QUERY_ME from '~/Graphql/query/me.graphql';
import MUTATION_INSERT_NEWS from '~/Graphql/mutation/insertNews.graphql';
import MUTATION_INSERT_NEWS_PHOTO from '~/Graphql/mutation/insertNewsPhoto.graphql';

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
    insertNews: PropTypes.func,
    insertNewsPhoto: PropTypes.func,
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
    this._handlePost = this._handlePost.bind(this);
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

  _handlePostNews(content) {
    return this.props.insertNews({
      userId: this.props.me.id,
      conferenceId: 1,
      contentNews: content,
    });
  }

  async _handlePostPhoto(photo, newsId) {
    const { uri, base64 } = photo;
    const { Key } = await S3.putAsync({ uri, base64 });
    console.log('key ', Key);

    // TODO: fill name for news photo
    await this.props.insertNewsPhoto({
      news_id: newsId,
      name: 'this is only image for test',
      url: Key,
    });
  }

  async _handlePost(contentNews, newsPhotos) {
    const newNews = await this._handlePostNews(contentNews);

    if (newsPhotos) {
      await newsPhotos.map(photo =>
        this._handlePostPhoto(photo, newNews.data.insertNews.id),
      );
    }

    await this._onRefresh();
  }

  _renderNewsFeedPosting(me) {
    return (
      <NewsFeedPosting
        avatar={me.avatar}
        userId={me.id}
        username={`${me.firstname} ${me.lastname}`}
        handlePost={this._handlePost}
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
        onEndReached={this._onEndReached(allNews)}
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
        {this._renderNewsFeedPosting(me)}
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

const NewsFeedPostingMutation = graphql(gql(MUTATION_INSERT_NEWS), {
  props: ({ mutate }) => ({
    insertNews: ({ userId, conferenceId, contentNews }) =>
      mutate({
        variables: { userId, conferenceId, contentNews },
        // update: (store, { data: { insertNews } }) => {
        //   const data = store.readQuery({
        //     query: gql(QUERY_ALL_NEWS),
        //     variables: {
        //       id: insertNews.id,
        //     },
        //   });

        //   if (isDuplicateNews(insertNews, data.getAllNews)) {
        //     return data;
        //   }

        //   store.writeQuery({
        //     query: gql(QUERY_ALL_NEWS),
        //     variables: {
        //       id: insertNews.id,
        //     },
        //     data,
        //   });
        // },
      }),
  }),
});

const NewsFeedPostingPhotoMutation = graphql(gql(MUTATION_INSERT_NEWS_PHOTO), {
  props: ({ mutate }) => ({
    insertNewsPhoto: ({ news_id, name, url }) =>
      mutate({
        variables: { news_id, name, url },
      }),
  }),
});

export default compose(
  AllNewsQuery,
  MeQuery,
  NewsFeedPostingMutation,
  NewsFeedPostingPhotoMutation,
)(NewsFeedScene);
