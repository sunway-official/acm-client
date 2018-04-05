import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FlatList } from 'react-native';
import { compose, gql, graphql } from 'react-apollo';
import { View } from 'react-native';
import { Colors } from 'Theme';
import { News, LoadingIndicator, EmptyCollection } from 'Component';
import { KEY as NAVIGATION_KEY } from 'Reduck/Navigation';
import { navigate } from 'Reduck/Navigation/action';
import FakePosting from './FakePosting';
import QUERY_ALL_NEWS from 'Graphql/query/getAllNews.graphql';
import QUERY_ME from 'Graphql/query/me.graphql';
import styles from './styles';

const PAGE_SIZE = 10;
const NETWORK_STATUS_LOADING = 1;
const NETWORK_STATUS_REFETCHING = 4;

class NewsFeedScene extends Component {
  static propTypes = {
    allNews: PropTypes.array,
    me: PropTypes.object,
    networkStatus: PropTypes.number,
    refetch: PropTypes.func,
    fetchMore: PropTypes.func,
    sceneIndex: PropTypes.number,
    navigationIndex: PropTypes.number,
    loading: PropTypes.bool,
  };

  constructor(props) {
    super(props);

    this.state = {
      lastNavigationIndex: 0,
    };

    this._onRefresh = this._onRefresh.bind(this);
    this._onEndReached = this._onEndReached.bind(this);
  }

  componentWillReceiveProps({ navigationIndex }) {
    // Set lastNavigationIndex value when navigate to any scene
    const { sceneIndex } = this.props;
    if (navigationIndex !== sceneIndex) {
      this.setState({ lastNavigationIndex: navigationIndex });
    }
  }

  componentWillUpdate(nextProps, nextState) {
    // Check when navigation back by comparing lastNavigationIndex
    const { sceneIndex } = this.props;
    if (
      nextProps.navigationIndex === sceneIndex &&
      nextState.lastNavigationIndex !== sceneIndex
    ) {
      this.props.refetch();
      this.setState({ lastNavigationIndex: nextProps.navigationIndex });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    // Prevent update when lastNavigationIndex or sceneIndex has changed
    if (nextState.lastNavigationIndex !== this.state.lastNavigationIndex) {
      return false;
    }
    if (nextProps.sceneIndex !== this.props.sceneIndex) {
      return false;
    }
    return true;
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

  FakePosting({ avatar, gender, id, firstname, lastname }) {
    return (
      <FakePosting
        avatar={avatar}
        gender={gender}
        userId={id}
        username={`${firstname} ${lastname}`}
      />
    );
  }

  _renderNewsFeedList(allNews, networkStatus, user) {
    return (
      <FlatList
        data={allNews}
        contentContainerStyle={styles.listContentContainer}
        refreshing={networkStatus === NETWORK_STATUS_REFETCHING}
        renderItem={({ item, index }) => (
          <News
            item={item}
            key={index}
            userId={user.id}
            onRefresh={this._onRefresh}
            avatar={user.avatar}
            gender={user.gender}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
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
    const { allNews, networkStatus, me } = this.props;
    if (networkStatus === NETWORK_STATUS_LOADING) {
      return this._renderLoading();
    }
    return allNews.length === 0 ? (
      <View style={styles.emptyContainer}>
        {this.FakePosting(me)}
        <EmptyCollection
          emptyText={'No news. Be the first one.'}
          customStyles={styles.emptyCollection}
        />
      </View>
    ) : (
      <View style={styles.container}>
        {this.FakePosting(me)}
        {this._renderNewsFeedList(allNews, networkStatus, me)}
      </View>
    );
  }
}

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

NewsFeedScene.drawer = {
  primary: true,
};

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

const mapStateToProps = state => {
  // Find newsfeed scene index in navigation stack
  let sceneIndex = 0;
  state[NAVIGATION_KEY].routes.map(({ routeName }, index) => {
    if (routeName === 'newsFeed') {
      sceneIndex = index;
    }
  });
  return {
    sceneIndex,
    navigationIndex: state[NAVIGATION_KEY].index,
  };
};

export default compose(QueryAllNews, QueryMe, connect(mapStateToProps))(
  NewsFeedScene,
);
