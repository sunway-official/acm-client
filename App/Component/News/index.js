import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
import moment from 'moment';

import { Colors, Metrics } from '~/Theme';
import { Text, UserAvatar } from '~/Component';
import Comments from './Comments';
import styles from './styles';

const { baseMargin, doubleBaseMargin, screenWidth } = Metrics;
// const photoHeight = screenWidth / 1.8;

class News extends Component {
  static propTypes = {
    item: PropTypes.object,
    newsContainerStyle: PropTypes.object,
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

  _renderNewsHeader(item) {
    let secondaryText = moment(item.updated_at).fromNow();

    return (
      <View style={styles.postHeader}>
        <View style={styles.rightPostHeader}>
          <UserAvatar
            small
            avatar={item.user.avatar}
            containerStyle={styles.avatar}
          />
          <View>
            <Text style={styles.username}>
              {`${item.user.firstname} ${item.user.lastname}`}
            </Text>
            <Text style={styles.secondaryText}>
              {secondaryText}
            </Text>
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
        <Image
          source={{ uri: imageUrl[0] }}
          style={{
            resizeMode: 'cover',
            marginVertical: 8,
          }}
        />
      );
    else
      return (
        <View
          style={{
            flexDirection: 'row',
            marginVertical: baseMargin,
            // maxHeight: 200,
          }}
        >
          <View style={{ flex: 2 }}>
            <Image
              source={{ uri: imageUrl[0] }}
              style={{ resizeMode: 'cover', minHeight: 200 }}
            />
          </View>

          <View
            style={{
              flex: 1,
              marginHorizontal: baseMargin,
              maxHeight: 200,
            }}
          >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
              <Image
                source={{ uri: imageUrl[1] }}
                style={{
                  resizeMode: 'cover',
                  minHeight: 92,
                  marginBottom: baseMargin,
                }}
              />
              <Image
                source={{ uri: imageUrl[1] }}
                style={{
                  resizeMode: 'cover',
                  minHeight: 92,
                  marginBottom: baseMargin,
                }}
              />
              <Image
                source={{ uri: imageUrl[1] }}
                style={{
                  resizeMode: 'cover',
                  minHeight: 92,
                  marginBottom: baseMargin,
                }}
              />
              <Image
                source={{ uri: imageUrl[1] }}
                style={{
                  resizeMode: 'cover',
                  minHeight: 92,
                  marginBottom: baseMargin,
                }}
              />
              <Image
                source={{ uri: imageUrl[2] }}
                style={{
                  resizeMode: 'cover',
                  minHeight: 92,
                  marginBottom: baseMargin,
                }}
              />
              <Image
                source={{ uri: imageUrl[3] }}
                style={{
                  resizeMode: 'cover',
                  minHeight: 92,
                  marginBottom: baseMargin,
                }}
              />
            </ScrollView>
          </View>
        </View>
      );
  }

  _renderStatus(item) {
    const url = item.newsPhotos.map(newsPhoto => newsPhoto.url);

    return (
      <View>
        <Text>
          {item.content}
        </Text>
        {this._renderPhotoView(url)}
      </View>
    );
  }

  _renderInteraction(onPressHandler, icon, text) {
    return (
      <TouchableOpacity onPress={onPressHandler} style={styles.interaction}>
        {icon}
        <Text style={styles.secondaryText}>
          {text}
        </Text>
      </TouchableOpacity>
    );
  }

  _renderInteractionBar(item) {
    return (
      <View style={styles.interactionBarContainer}>
        {this._renderInteraction(
          this._onPressLove,
          this.state.isLove
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
    const { item, newsContainerStyle } = this.props;

    return (
      <View style={[styles.container, newsContainerStyle]}>
        {this._renderNewsHeader(item)}
        <View>
          {this._renderStatus(item)}
          {this._renderInteractionBar(item)}
          {this.state.showCommentBox
            ? <Comments
                comments={item.newsComments}
                userAvatar={item.user.avatar}
              />
            : <View />}
        </View>
      </View>
    );
  }
}

export default News;
