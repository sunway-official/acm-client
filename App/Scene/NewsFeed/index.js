import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FlatList } from 'react-native';
import { compose, gql, graphql } from 'react-apollo';
import { View } from 'react-native';
import styles from './styles';
import { Colors, Images } from '~/Theme';
import { News, LoadingIndicator } from '~/Component';
import NewsFeedFakePosting from './NewsFeedFakePosting';
import { S3_GET_PREFIX } from '~/env';

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

const GENDER_MALE = 'male';
const GENDER_FEMALE = 'female';

const defaultAvatar = (avatar, gender) => {
  let defaultAvatar = Images.avatar['male02'];
  if (avatar) {
    avatar = { uri: S3_GET_PREFIX + avatar };
  } else {
    switch (gender) {
      case GENDER_MALE:
        defaultAvatar = Images.avatar['male08'];
        break;
      case GENDER_FEMALE:
        defaultAvatar = Images.avatar['female01'];
        break;
    }
    avatar = defaultAvatar;
  }
  return avatar;
};

const PAGE_SIZE = 10;

class NewsFeedScene extends Component {
  static propTypes = {
    allNews: PropTypes.array,
    me: PropTypes.object,
    networkStatus: PropTypes.number,
    refetch: PropTypes.func,
    fetchMore: PropTypes.func,
    home: PropTypes.func,
    setTitle: PropTypes.func,
    toggleHeader: PropTypes.func,
    toggleFooter: PropTypes.func,
    isPosted: PropTypes.number,
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

  static drawer = {
    primary: true,
  };

  constructor(props) {
    super(props);

    this.state = {
      isRefresh: false,
    };

    this._onRefresh = this._onRefresh.bind(this);
    this._onEndReached = this._onEndReached.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    // ? when navigation to NewsFeedPosting
    if (nextProps.isPosted === 1) {
      this.setState({ isRefresh: true });
    }
  }

  componentWillUpdate(nextProps, nextState) {
    // ? when navigation back
    if (nextProps.isPosted === 0 && nextState.isRefresh === true) {
      this._onRefresh();
      this.setState({ isRefresh: false });
    }
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
    let avatar =
      me.avatar !== null ? me.avatar : defaultAvatar(me.avatar, me.gender);
    return (
      <NewsFeedFakePosting
        avatar={avatar}
        userId={me.id}
        username={`${me.firstname} ${me.lastname}`}
      />
    );
  }

  _renderNewsFeedList(allNews, networkStatus, me) {
    let avatar =
      me.avatar !== null ? me.avatar : defaultAvatar(me.avatar, me.gender);
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
            avatar={avatar}
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
    if (networkStatus === 1) {
      return (
        <View style={styles.loadingContainer}>
          <LoadingIndicator />
        </View>
      );
    }

    const { allNews, networkStatus, me } = this.props;

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

function mapStateToProps(state) {
  return {
    isPosted: state.navigation.index,
  };
}

export default compose(AllNewsQuery, MeQuery, connect(mapStateToProps))(
  NewsFeedScene,
);
