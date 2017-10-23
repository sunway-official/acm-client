import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose, graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { View, Image, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import moment from 'moment';

import { Colors, Metrics, Images } from '~/Theme';
import { Text, UserAvatar, TouchableView, LoadingIndicator } from '~/Component';
import Comments from './Comments';
import styles from './styles';

import NEWS_LIKE_BY_ID_QUERY from '~/Graphql/query/getNewsLikeById.graphql';

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

class News extends Component {
  static propTypes = {
    item: PropTypes.object,
    newsContainerStyle: PropTypes.object,
    userId: PropTypes.string,
    loading: PropTypes.bool,
    newsLikeById: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      showCommentBox: false,
      isLove: false,
    };
    this._onPressComment = this._onPressComment.bind(this);
    this._onPressLove = this._onPressLove.bind(this);
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
    return (
      <View style={styles.postHeader}>
        <View style={styles.rightPostHeader}>
          <UserAvatar
            small
            avatar={
              item.user.avatar === null ? defaultAvatar : item.user.avatar
            }
            containerStyle={styles.avatar}
          />
          <View>
            <Text style={styles.username}>
              {`${item.user.firstname} ${item.user.lastname}`}
            </Text>
            <Text style={styles.secondaryText}>{createdAt}</Text>
          </View>
        </View>
        <TouchableOpacity>
          <Icon name="chevron-down" type="material-community" />
        </TouchableOpacity>
      </View>
    );
  }

  _renderPhotoView(imageUrl) {
    if (imageUrl.length === 1)
      return (
        <Image source={{ uri: imageUrl[0] }} style={styles.coverSingleImage} />
      );
    if (imageUrl.length === 2)
      return (
        <View style={styles.photoViewTwoImage}>
          <Image
            source={{ uri: imageUrl[0] }}
            style={styles.firstMediumImage}
          />
          <Image
            source={{ uri: imageUrl[1] }}
            style={styles.secondMediumImage}
          />
        </View>
      );
    else
      return (
        <View style={styles.photoViewContainer}>
          <View style={{ flex: 2 }}>
            <Image source={{ uri: imageUrl[0] }} style={styles.coverImage} />
          </View>

          <View style={styles.photoViewSubContainer}>
            <Image source={{ uri: imageUrl[1] }} style={styles.smallImage} />
            {imageUrl.length > 2 ? (
              <TouchableView>
                <Image
                  source={{ uri: imageUrl[2] }}
                  style={styles.smallImage}
                />
                <Text
                  medium
                  style={styles.moreImages}
                >{`+ ${imageUrl.length}`}</Text>
              </TouchableView>
            ) : (
              <Image source={{ uri: imageUrl[2] }} style={styles.smallImage} />
            )}
          </View>
        </View>
      );
  }

  _renderStatus(item) {
    const url = item.newsPhotos.map(newsPhoto => newsPhoto.url);

    return (
      <View>
        <Text>{item.content}</Text>
        {this._renderPhotoView(url)}
      </View>
    );
  }

  _renderInteraction(onPressHandler, icon, text) {
    return (
      <TouchableOpacity onPress={onPressHandler} style={styles.interaction}>
        {icon}
        <Text style={styles.secondaryText}>{text}</Text>
      </TouchableOpacity>
    );
  }

  _renderInteractionBar(item, userId) {
    const { newsLikeById, loading } = this.props;

    if (loading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <LoadingIndicator />
        </View>
      );
    }

    let newsLikeByUserId = newsLikeById.user.id;
    return (
      <View style={styles.interactionBarContainer}>
        {this._renderInteraction(
          this._onPressLove,
          userId === newsLikeByUserId
            ? this._renderIcon('ios-heart', 'ionicon', Colors.red)
            : this._renderIcon('ios-heart-outline', 'ionicon'),
          item.newsLikes.length,
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
    this.setState({ showCommentBox: !this.state.showCommentBox });
  }

  _onPressLove() {
    this.setState({ isLove: !this.state.isLove });
  }

  render() {
    const { item, newsContainerStyle, userId } = this.props;
    let createdAt = formatCreatedAt(item.updated_at);

    return (
      <View style={[styles.container, newsContainerStyle]}>
        {this._renderNewsHeader(item, createdAt)}
        <View>
          {this._renderStatus(item)}
          {this._renderInteractionBar(item, userId)}
          {this.state.showCommentBox ? (
            <Comments
              comments={item.newsComments}
              userAvatar={
                item.user.avatar === null ? defaultAvatar : item.user.avatar
              }
              createdAt={createdAt}
              newsId={item.id}
              userId={userId}
            />
          ) : (
            <View />
          )}
        </View>
      </View>
    );
  }
}

const NewsLikeByIdQuery = graphql(gql(NEWS_LIKE_BY_ID_QUERY), {
  options: { variables: { id: 109 } },
  props: ({ data: { loading, getNewsLikeByID } }) => ({
    loading,
    newsLikeById: getNewsLikeByID,
  }),
});

export default compose(NewsLikeByIdQuery)(News);
