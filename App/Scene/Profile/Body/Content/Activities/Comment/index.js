import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { Icon, Avatar } from 'react-native-elements';
import { Text } from '~/Component';
import { Colors, Metrics } from '../../../../../../Theme';
import comments from './fixture';
import styles from './styles';

const DEFAULT_AVATAR =
  'https://www.1plusx.com/app/mu-plugins/all-in-one-seo-pack-pro/images/default-user-image.png';

class Comment extends Component {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {
      loveComment: false,
    };
    this._renderComments = this._renderComments.bind(this);
    this._renderCommentInputBox = this._renderCommentInputBox.bind(this);
    this._handlePressOfLove = this._handlePressOfLove.bind(this);
  }

  _handlePressOfLove() {
    this.setState({ loveComment: !this.state.loveComment });
  }

  _renderAvatar(avatarURL) {
    return (
      <Avatar
        small
        rounded
        source={{
          uri: avatarURL,
        }}
      />
    );
  }

  _renderComments(comment, index) {
    return (
      <View style={styles.commentContainer} key={index}>
        {this._renderAvatar(comment.avatar)}
        <View style={styles.rightOfComment}>
          <View flexDirection="row">
            <Text bold>
              {comment.username}
            </Text>
            <Icon name="dot-single" type="entypo" color="grey" />
            <Text style={styles.textColor}>
              {comment.time}
            </Text>
          </View>
          <Text>
            {comment.comment}
          </Text>
          <View style={styles.rightFooterOfComment}>
            <View style={styles.interactionContainer}>
              <TouchableOpacity>
                <Text style={styles.replyTextStyle}>Reply</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this._handlePressOfLove}>
                {this.state.loveComment
                  ? <Icon
                      name="heart"
                      type="material-community"
                      color="red"
                      size={20}
                    />
                  : <Text style={styles.textColor}>Love</Text>}
              </TouchableOpacity>
            </View>
            <View flexDirection="row">
              <Icon
                name="heart"
                type="material-community"
                color="red"
                size={20}
                marginRight={Metrics.smallMargin}
              />
              <Text bold>
                {comment.love}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }

  _renderCommentInputBox() {
    return (
      <View style={styles.commentInputBoxContainer}>
        {this._renderAvatar(DEFAULT_AVATAR)}
        <View style={styles.commentInputBox}>
          <TextInput
            placeholder="Type a comment ..."
            placeholderTextColor={Colors.grey}
            multiline={true}
            underlineColorAndroid="rgba(0,0,0,0)"
            style={styles.textInputStyle}
          />
          <TouchableOpacity style={styles.commentSubmitButton}>
            <Text>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  render() {
    return (
      <View>
        {comments.map((comment, index) => this._renderComments(comment, index))}
        {this._renderCommentInputBox()}
      </View>
    );
  }
}

export default Comment;
