import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { Text } from '~/Component';
import { Colors } from '../../../Theme';
import Comment from './Comment';
import styles from './styles';
import UserAvatar from '../UserAvatar';

class Comments extends Component {
  static propTypes = {
    comments: PropTypes.array,
    userAvatar: PropTypes.string,
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
    const { comments, userAvatar } = this.props;
    return (
      <View>
        {comments.map((comment, index) =>
          <Comment comment={comment} key={index} />,
        )}
        {this._renderCommentInputBox(userAvatar)}
      </View>
    );
  }
}

export default Comments;
