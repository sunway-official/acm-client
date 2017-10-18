import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { Text, UserAvatar } from '~/Component';
import Comment from './Comment';
import styles from './styles';

class Comments extends Component {
  static propTypes = {
    comments: PropTypes.array,
    userAvatar: PropTypes.string,
    createdAt: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this._renderCommentInputBox = this._renderCommentInputBox.bind(this);
  }

  _renderCommentInputBox(userAvatar) {
    return (
      <View style={styles.commentInputBoxContainer}>
        <UserAvatar avatar={userAvatar} />
        <View style={styles.commentInputBox}>
          <TextInput
            placeholder="Type a comment ..."
            placeholderTextColor="#bdc3c7"
            multiline={true}
            underlineColorAndroid="rgba(0,0,0,0)"
            style={styles.textInputStyle}
          />
          <TouchableOpacity style={styles.commentSubmitButton}>
            <Text style={styles.sendCommentBtn}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  render() {
    const { comments, userAvatar, createdAt } = this.props;
    return (
      <View>
        {comments.map((comment, index) =>
          <Comment comment={comment} key={index} createdAt={createdAt} />,
        )}
        {this._renderCommentInputBox(userAvatar)}
      </View>
    );
  }
}

export default Comments;
