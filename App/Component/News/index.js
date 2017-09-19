import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Image, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { Colors, Metrics } from '../../Theme';
import { Text, UserAvatar } from '~/Component';
import Comments from './Comments';
import styles from './styles';

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
    this._handlePressOfComment = this._handlePressOfComment.bind(this);
    this._handlePressOfLove = this._handlePressOfLove.bind(this);
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
    return (
      <View style={styles.postHeader}>
        <View style={styles.rightPostHeader}>
          <UserAvatar
            medium
            avatar={item.avatar}
            containerStyle={styles.avatar}
          />
          <View>
            <Text style={styles.username}>
              {item.username}
            </Text>
            <Text style={styles.secondaryText}>
              {item.time}
            </Text>
          </View>
        </View>
        <TouchableOpacity>
          <Icon name="chevron-down" type="material-community" />
        </TouchableOpacity>
      </View>
    );
  }

  _renderStatus(item) {
    return (
      <View>
        <Text>
          {item.status}
        </Text>
        <Image
          source={{
            uri: item.photo,
          }}
          style={styles.photo}
        />
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
          this._handlePressOfLove,
          this.state.isLove
            ? this._renderIcon('ios-heart', 'ionicon', Colors.red)
            : this._renderIcon('ios-heart-outline', 'ionicon'),
          item.love,
        )}
        {this._renderInteraction(
          this._handlePressOfComment,
          this._renderIcon('comment', 'evilicon'),
          item.comments.length,
        )}
      </View>
    );
  }

  _handlePressOfComment() {
    this.setState({ showCommentBox: !this.state.showCommentBox });
  }

  _handlePressOfLove() {
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
            ? <Comments comments={item.comments} userAvatar={item.avatar} />
            : <View />}
        </View>
      </View>
    );
  }
}

export default News;
