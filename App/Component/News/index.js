import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose, gql, graphql } from 'react-apollo';
import { View } from 'react-native';
import moment from 'moment';

import { Text } from '~/Component';
import styles from './styles';

import Comments from './Comments';
import NewsHeader from './Header.js';
import NewsInteractionBar from './InteractionBar.js';
import NewsPhotoView from './PhotoView.js';

import MUTATION_INSERT_NEWS_LIKE from '~/Graphql/mutation/insertNewsLike.graphql';
import MUTATION_DELETE_NEWS_LIKE from '~/Graphql/mutation/deleteNewsLike.graphql';

const formatCreatedAt = createdAt =>
  moment(createdAt).calendar(null, {
    sameDay: '[Today]',
    nextDay: '[Tomorrow]',
    nextWeek: 'dddd',
    lastDay: '[Yesterday]',
    lastWeek: 'dddd',
    sameElse: 'DD/MM/YYYY',
  });

const isTheSame = (firstParams, secondParams) => firstParams === secondParams;

class News extends Component {
  static propTypes = {
    item: PropTypes.object,
    newsContainerStyle: PropTypes.object,
    userId: PropTypes.string,
    newsLikeById: PropTypes.object,
    insertNewsLike: PropTypes.func,
    deleteNewsLike: PropTypes.func,
    onRefresh: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      showCommentBox: false,
      numberOfLove: 0,
      isLove: false,
      isDisabledLove: false,
      numberOfComments: 0,
    };

    this._onPressComment = this._onPressComment.bind(this);
    this._onPressLove = this._onPressLove.bind(this);
  }

  componentDidMount() {
    const { userId, item } = this.props;
    let isLove = item.newsLikes.some(newsLike =>
      isTheSame(newsLike.user.id, userId),
    );

    this.setState({
      isLove: isLove,
      numberOfLove: item.newsLikes.length,
      numberOfComments: item.newsComments.length,
    });
  }

  _renderNewsHeader(item, createdAt) {
    let username = `${item.user.firstname} ${item.user.lastname}`;
    let avatar = item.user.avatar === null ? 25 : item.user.avatar;

    return (
      <NewsHeader avatar={avatar} username={username} createdAt={createdAt} />
    );
  }

  _renderPhotoView(imageUrl) {
    return <NewsPhotoView imageUrl={imageUrl} />;
  }

  _renderStatus(item) {
    const url = item.newsPhotos.map(newsPhoto => newsPhoto.url);

    return (
      <View>
        {item.content ? <Text>{item.content}</Text> : undefined}
        {this._renderPhotoView(url)}
      </View>
    );
  }

  _renderInteractionBar() {
    let { isLove, numberOfLove, isDisabledLove, numberOfComments } = this.state;

    return (
      <NewsInteractionBar
        isLove={isLove}
        numberOfLove={numberOfLove}
        isDisabledLove={isDisabledLove}
        numberOfComments={numberOfComments}
        onPressLove={this._onPressLove}
        onPressComment={this._onPressComment}
      />
    );
  }

  _renderCommentBox(item, createdAt, userId, onRefresh) {
    let avatar = item.user.avatar === null ? 25 : item.user.avatar;

    return (
      <Comments
        comments={item.newsComments}
        userAvatar={avatar}
        createdAt={createdAt}
        newsId={item.id}
        userId={userId}
        onRefresh={onRefresh}
      />
    );
  }

  _onPressComment() {
    this.setState(prevState => ({
      showCommentBox: !prevState.showCommentBox,
    }));
  }

  async _insertNewsLike(newsId, userId) {
    this.setState(prevState => ({
      isDisabledLove: !prevState.isDisabledLove,
      isLove: !prevState.isLove,
      numberOfLove: prevState.numberOfLove + 1,
    }));

    await this.props.insertNewsLike({
      news_id: newsId,
      user_id: userId,
    });
  }

  async _deleteNewsLike(newsLikes, userId) {
    this.setState(prevState => ({
      isDisabledLove: !prevState.isDisabledLove,
      isLove: !prevState.isLove,
      numberOfLove: prevState.numberOfLove - 1,
    }));

    await this.props.deleteNewsLike({
      newsLike_id: newsLikes.map(
        newsLike =>
          isTheSame(newsLike.user.id, userId) ? newsLike.id : undefined,
      ),
    });
  }

  async _onPressLove() {
    const { item, userId, onRefresh } = this.props;
    const { isLove } = this.state;

    if (isLove === false) {
      await this._insertNewsLike(item.id, userId);
      await onRefresh();
    } else {
      await this._deleteNewsLike(item.newsLikes, userId);
      await onRefresh();
    }
    this.setState(prevState => ({ isDisabledLove: !prevState.isDisabledLove }));
  }

  render() {
    const { item, newsContainerStyle, userId, onRefresh } = this.props;
    let createdAt = formatCreatedAt(item.updated_at);

    return (
      <View style={[styles.container, newsContainerStyle]}>
        {this._renderNewsHeader(item, createdAt)}
        <View>
          {this._renderStatus(item)}
          {this._renderInteractionBar()}
          {this.state.showCommentBox ? (
            this._renderCommentBox(item, createdAt, userId, onRefresh)
          ) : (
            <View />
          )}
        </View>
      </View>
    );
  }
}

const InsertNewsLikeWithMutation = graphql(gql(MUTATION_INSERT_NEWS_LIKE), {
  props: ({ mutate }) => ({
    insertNewsLike: ({ news_id, user_id }) =>
      mutate({
        variables: { news_id, user_id },
      }),
  }),
});

const DeleteNewsLikeWithMutation = graphql(gql(MUTATION_DELETE_NEWS_LIKE), {
  props: ({ mutate }) => ({
    deleteNewsLike: ({ newsLike_id }) =>
      mutate({
        variables: { newsLike_id },
      }),
  }),
});

export default compose(InsertNewsLikeWithMutation, DeleteNewsLikeWithMutation)(
  News,
);
