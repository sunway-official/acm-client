import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FlatList } from 'react-native';
import { compose, gql, graphql } from 'react-apollo';
import { View } from 'react-native';
import styles from './styles';
import { Colors } from '~/Theme';
import { News, LoadingIndicator } from '~/Component';
import FakePosting from './FakePosting';

import QUERY_ALL_NEWS from '~/Graphql/query/getAllNews.graphql';
import QUERY_ME from '~/Graphql/query/me.graphql';

const PAGE_SIZE = 10;

class NewsFeedScene extends Component {
  static propTypes = {
    allNews: PropTypes.array,
    me: PropTypes.object,
    networkStatus: PropTypes.number,
    refetch: PropTypes.func,
    fetchMore: PropTypes.func,
    isPosted: PropTypes.number,
    loading: PropTypes.bool,
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
    // ? when navigation to NewsPosting
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

  FakePosting(me) {
    let avatar = me.avatar;
    return (
      <FakePosting
        avatar={avatar}
        userId={me.id}
        username={`${me.firstname} ${me.lastname}`}
      />
    );
  }

  _renderNewsFeedList(allNews, networkStatus, me) {
    return (
      <FlatList
        data={allNews}
        contentContainerStyle={styles.listContentContainer}
        refreshing={networkStatus === 4}
        renderItem={({ item, index }) => (
          <News
            item={item}
            key={index}
            userId={me.id}
            onRefresh={this._onRefresh}
            avatar={me.avatar}
          />
        )}
        keyExtractor={(item, index) => index}
        onRefresh={this._onRefresh}
        onEndReachedThreshold={0.8}
        onEndReached={() => this._onEndReached(allNews)}
      />
    );
  }

  _renderLoading() {
    return (
      <View style={styles.loadingContainer}>
        <LoadingIndicator />
      </View>
    );
  }

  render() {
    const { allNews, networkStatus, me, loading } = this.props;

    return loading ? (
      this._renderLoading()
    ) : (
      <View style={styles.container}>
        {this.FakePosting(me)}
        {this._renderNewsFeedList(allNews, networkStatus, me)}
      </View>
    );
  }
}

const QueryMe = graphql(gql(QUERY_ME), {
  props: ({ data: { loading, me } }) => ({
    loading,
    me,
  }),
});

const QueryAllNews = graphql(gql(QUERY_ALL_NEWS), {
  props: ({
    data: { getAllNews, refetch, networkStatus, fetchMore, loading },
  }) => ({
    allNews: getAllNews,
    refetch,
    networkStatus,
    fetchMore,
    loading,
  }),
  options: {
    notifyOnNetworkStatusChange: true,
    variables: { pageNumber: 0, pageSize: PAGE_SIZE },
    fetchPolicy: 'network-only',
  },
});

function mapStateToProps(state) {
  return {
    isPosted: state.navigation.index,
  };
}

export default compose(QueryAllNews, QueryMe, connect(mapStateToProps))(
  NewsFeedScene,
);
