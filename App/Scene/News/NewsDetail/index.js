import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  RefreshControl,
} from 'react-native';
import { compose, gql, graphql } from 'react-apollo';
import { Text, LoadingIndicator } from '~/Component';
import NewsHeader from '~/Component/News/Header';
import NewsInteractionBar from '~/Component/News/InteractionBar';
import NewsPhotoView from '~/Component/News/PhotoView';
import Comments from './Comments';
import CommentForm from './Comments/Form';
import { Colors } from '~/Theme';
import { KEY as NAVIGATION_KEY } from '~/Redux/Navigation';
import { transformDate } from '~/Transformer';
import QUERY_ALL_COMMENTS from '~/Graphql/query/getAllNewsComments.graphql';
import QUERY_ALL_LIKES from '~/Graphql/query/getAllNewsLikes.graphql';
import QUERY_ME from '~/Graphql/query/me.graphql';
import INSERT_NEWS_LIKE_MUTATION from '~/Graphql/mutation/insertNewsLike.graphql';
import DELETE_NEWS_LIKE_MUTATION from '~/Graphql/mutation/deleteNewsLike.graphql';

import styles from './styles';

const ROUTE_NAME = 'newsDetail';
const DEFAULT_NEWS_DETAIL = {
  user: {},
  newsPhotos: [],
  content: '',
};

const NEWS_CONTENT_THRESHOLD = 60;
class NewsDetailScene extends Component {
  static propTypes = {
    detail: PropTypes.object,
    queryMe: PropTypes.object,
    comments: PropTypes.array,
    likes: PropTypes.array,
    onRefresh: PropTypes.func,
    queryComments: PropTypes.object,
    queryLikes: PropTypes.object,
    insertNewsLike: PropTypes.func,
    deleteNewsLike: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      isLiked: false,
      isDisabledLike: false,
      numberOfComments: 0,
      numberOfLikes: 0,
      refreshing: false,
    };
    this._renderInteractionBar = this._renderInteractionBar.bind(this);
    this._renderRefeshControl = this._renderRefeshControl.bind(this);
    this._renderCommentBox = this._renderCommentBox.bind(this);
    this.onPressLike = this.onPressLike.bind(this);
    this.onPressComment = this.onPressComment.bind(this);
  }

  componentWillReceiveProps({ detail, comments, likes }) {
    // Always update comments and likes count
    if (comments || likes) {
      if (comments) {
        console.log(comments);
        this.setState({ numberOfComments: comments.length });
      }
      if (likes) {
        console.log(likes);
        this.setState({ numberOfLikes: likes.length });
        const like = likes.filter(
          like => like.user_id === this.props.queryMe.me.id,
        )[0];
        if (like) {
          this.setState({ isLiked: true });
        } else {
          this.setState({ isLiked: false });
        }
      }
      return;
    }
    // From navigation props
    if (detail) {
      this.setState({
        numberOfComments: detail.commentsCount,
        numberOfLikes: detail.likesCount,
      });
    }
  }

  async onPressLike() {
    this.setState({ isDisabledLike: true });
    if (this.state.isLiked === false) {
      this.setState({
        numberOfLikes: this.state.numberOfLikes + 1,
        isLiked: true,
      });

      const { data: { insertNewsLike } } = await this.props.insertNewsLike({
        news_id: this.props.detail.id,
      });
      this.setState({ like: insertNewsLike });
    } else {
      this.setState({
        numberOfLikes: this.state.numberOfLikes - 1,
        isLiked: false,
      });
      await this.props.deleteNewsLike({
        news_id: this.props.detail.id,
      });
    }
    this.setState({ isDisabledLike: false });
  }

  onPressComment() {
    console.log('comment');
  }

  _renderPhotoView(imageUrl) {
    return <NewsPhotoView imageUrl={imageUrl} />;
  }

  _renderNewsHeader(item, createdAt) {
    let username = `${item.user.firstname} ${item.user.lastname}`;
    let avatar = item.user.avatar;

    return (
      <NewsHeader
        avatar={avatar}
        gender={item.user.gender}
        username={username}
        createdAt={createdAt}
      />
    );
  }

  _renderNewsContent(item) {
    const url = item.newsPhotos.map(newsPhoto => newsPhoto.url);

    return (
      <View style={styles.newsContentContainer}>
        {item.content ? (
          <Text
            style={[
              styles.newsContentText,
              item.content.length < NEWS_CONTENT_THRESHOLD
                ? styles.newshightLightContentText
                : {},
            ]}
          >
            {item.content}
          </Text>
        ) : null}
        {this._renderPhotoView(url)}
      </View>
    );
  }

  _renderInteractionBar() {
    const {
      isLiked,
      isDisabledLike,
      numberOfComments,
      numberOfLikes,
    } = this.state;
    return (
      <NewsInteractionBar
        isLiked={isLiked}
        isDisabledLike={isDisabledLike}
        numberOfLikes={numberOfLikes}
        numberOfComments={numberOfComments}
        onPressLike={this.onPressLike}
        onPressComment={this.onPressComment}
      />
    );
  }

  _renderCommentBox(detail, loading, comments, createdAt) {
    return loading &&
      comments.length === 0 &&
      this.state.refreshing === false ? (
      <LoadingIndicator />
    ) : (
      <Comments comments={comments} createdAt={createdAt} newsId={detail.id} />
    );
  }

  _renderCommentForm(detail, refetch) {
    return <CommentForm newsId={detail.id} onRefresh={refetch} />;
  }

  _renderRefeshControl() {
    const onRefresh = async () => {
      this.setState({ refreshing: true });
      await Promise.all([
        this.props.queryComments.refetch(),
        this.props.queryLikes.refetch(),
      ]);
      this.setState({ refreshing: false });
    };
    return (
      <RefreshControl
        refreshing={this.state.refreshing}
        onRefresh={onRefresh}
      />
    );
  }

  render() {
    const { detail, comments = [], queryComments } = this.props;
    const createdAt = transformDate.formatTimestamp(detail.updated_at);

    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={'padding'}
        keyboardVerticalOffset={85}
      >
        <ScrollView
          style={styles.scrollView}
          refreshControl={this._renderRefeshControl()}
        >
          <View style={styles.scrollViewContentContainer}>
            {this._renderNewsHeader(detail, createdAt)}
            {this._renderNewsContent(detail)}
            {this._renderInteractionBar()}
            {this._renderCommentBox(
              detail,
              queryComments.loading,
              comments,
              createdAt,
            )}
          </View>
        </ScrollView>
        {this._renderCommentForm(detail, queryComments.refetch)}
      </KeyboardAvoidingView>
    );
  }
}

NewsDetailScene.header = {
  leftIcon: 'back',
  theme: 'dark',
  statusBarBackgroundColor: Colors.primary,
};

NewsDetailScene.drawer = {
  disableGestures: true,
};

const QueryMe = graphql(gql(QUERY_ME), {
  props: ({ data }) => ({ queryMe: data }),
});

const QueryLikes = graphql(gql(QUERY_ALL_LIKES), {
  props: ({ data: { getNewsLikesByNewsID, refetch, loading } }) => ({
    likes: getNewsLikesByNewsID,
    queryLikes: {
      refetch,
      loading,
    },
  }),
  options: props => {
    return {
      notifyOnNetworkStatusChange: true,
      variables: {
        news_id: props.navigation.state.params.id,
      },
      fetchPolicy: 'network-only',
    };
  },
});

const QueryComments = graphql(gql(QUERY_ALL_COMMENTS), {
  props: ({ data: { getNewsCommentByNewsID, refetch, loading } }) => ({
    comments: getNewsCommentByNewsID,
    queryComments: {
      refetch,
      loading,
    },
  }),
  options: props => {
    return {
      notifyOnNetworkStatusChange: true,
      variables: {
        news_id: props.navigation.state.params.id,
      },
      fetchPolicy: 'network-only',
    };
  },
});

const InsertNewsLikeMutation = graphql(gql(INSERT_NEWS_LIKE_MUTATION), {
  props: ({ mutate }) => ({
    insertNewsLike: ({ news_id }) =>
      mutate({
        variables: { news_id },
      }),
  }),
});

const DeleteNewsLikeMutation = graphql(gql(DELETE_NEWS_LIKE_MUTATION), {
  props: ({ mutate }) => ({
    deleteNewsLike: ({ news_id }) =>
      mutate({
        variables: { news_id },
      }),
  }),
});

let newsDetailCache = DEFAULT_NEWS_DETAIL;
const mapStateToProps = state => {
  // Get route index
  const index = state[NAVIGATION_KEY].index;
  const routeName = state[NAVIGATION_KEY].routes[index].routeName;
  let data =
    routeName !== ROUTE_NAME
      ? undefined
      : {
          ...state[NAVIGATION_KEY].routes[index].params,
        };
  // Cache Detail Scene to prevent render undefined scene in transition phase
  if (data !== undefined) {
    newsDetailCache = data;
  }
  return {
    detail: data || newsDetailCache,
  };
};

export default compose(
  QueryMe,
  QueryComments,
  QueryLikes,
  InsertNewsLikeMutation,
  DeleteNewsLikeMutation,
  connect(mapStateToProps),
)(NewsDetailScene);
