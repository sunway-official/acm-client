import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose, gql, graphql } from 'react-apollo';
import { View, Image, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import moment from 'moment';
import { S3_GET_PREFIX } from '~/env';

import { Colors, Metrics, Images } from '~/Theme';
import { Text, UserAvatar, TouchableView } from '~/Component';
import Comments from './Comments';
import styles from './styles';

import MUTATION_INSERT_NEWS_LIKE from '~/Graphql/mutation/insertNewsLike.graphql';
import MUTATION_DELETE_NEWS_LIKE from '~/Graphql/mutation/deleteNewsLike.graphql';

const defaultAvatar = Images.avatar['male08'];

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
    };
    this._onPressComment = this._onPressComment.bind(this);
    this._onPressLove = this._onPressLove.bind(this);
  }

  componentDidMount() {
    const { userId, item } = this.props;
    let isLove = item.newsLikes.some(newsLike =>
      isTheSame(newsLike.user.id, userId),
    );

    if (isLove)
      this.setState({ isLove: true, numberOfLove: item.newsLikes.length });
  }

  _renderIcon(name, type, color) {
    return (
      <Icon
        name={name}
        type={type}
        color={color}
        marginRight={Metrics.smallMargin}
      />
    );
  }

  _renderNewsHeader(item, createdAt) {
    let avatar = item.user.avatar === null ? defaultAvatar : item.user.avatar;
    let username = `${item.user.firstname} ${item.user.lastname}`;

    return (
      <View style={styles.postHeader}>
        <View style={styles.rightPostHeader}>
          <UserAvatar small avatar={avatar} containerStyle={styles.avatar} />
          <View>
            <Text style={styles.username}>{username}</Text>
            <Text style={styles.secondaryText}>{createdAt}</Text>
          </View>
        </View>
        <TouchableOpacity>
          <Icon name="chevron-down" type="material-community" />
        </TouchableOpacity>
      </View>
    );
  }

  _renderPhotoImage(imageUrl, position, styles) {
    return (
      <Image
        source={{ uri: S3_GET_PREFIX + imageUrl[position] }}
        style={styles}
      />
    );
  }

  _renderPhotoView(imageUrl) {
    if (imageUrl.length === 1) {
      return this._renderPhotoImage(imageUrl, 0, styles.coverSingleImage);
    }
    if (imageUrl.length === 2)
      return (
        <View style={styles.photoViewTwoImage}>
          {this._renderPhotoImage(imageUrl, 0, styles.firstMediumImage)}
          {this._renderPhotoImage(imageUrl, 1, styles.secondMediumImage)}
        </View>
      );
    if (imageUrl.length > 2)
      return (
        <View style={styles.photoViewContainer}>
          <View style={{ flex: 2 }}>
            {this._renderPhotoImage(imageUrl, 0, styles.coverImage)}
          </View>

          <View style={styles.photoViewSubContainer}>
            {this._renderPhotoImage(imageUrl, 1, styles.smallImage)}
            {imageUrl.length > 2 ? (
              <TouchableView>
                {this._renderPhotoImage(imageUrl, 2, styles.smallImage)}
                <Text medium style={styles.moreImages}>{`+ ${imageUrl.length -
                  2}`}</Text>
              </TouchableView>
            ) : (
              this._renderPhotoImage(imageUrl, 2, styles.smallImage)
            )}
          </View>
        </View>
      );
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

  _renderInteraction(onPressHandler, icon, text) {
    const { isDisabledLove } = this.state;
    return (
      <TouchableOpacity
        onPress={onPressHandler}
        style={styles.interaction}
        disabled={isDisabledLove}
      >
        {icon}
        <Text style={styles.secondaryText}>{text}</Text>
      </TouchableOpacity>
    );
  }

  _renderInteractionBar(item) {
    let { isLove, numberOfLove } = this.state;

    return (
      <View style={styles.interactionBarContainer}>
        {this._renderInteraction(
          this._onPressLove,
          isLove
            ? this._renderIcon('ios-heart', 'ionicon', Colors.red)
            : this._renderIcon('ios-heart-outline', 'ionicon'),
          numberOfLove,
        )}
        {this._renderInteraction(
          this._onPressComment,
          this._renderIcon('comment', 'evilicon'),
          item.newsComments.length,
        )}
      </View>
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
    let avatar = item.user.avatar === null ? defaultAvatar : item.user.avatar;

    return (
      <View style={[styles.container, newsContainerStyle]}>
        {this._renderNewsHeader(item, createdAt)}
        <View>
          {this._renderStatus(item)}
          {this._renderInteractionBar(item)}
          {this.state.showCommentBox ? (
            <Comments
              comments={item.newsComments}
              userAvatar={avatar}
              createdAt={createdAt}
              newsId={item.id}
              userId={userId}
              onRefresh={onRefresh}
            />
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
