import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { compose, gql, graphql } from 'react-apollo';
import { Text, UserAvatar } from '~/Component';
import Comment from './Comment';
import styles from './styles';

import { Colors } from '~/Theme';

import MUTATION_INSERT_NEWS_COMMENT from '~/Graphql/mutation/insertNewsComment.graphql';

class Comments extends Component {
  static propTypes = {
    comments: PropTypes.array,
    userAvatar: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    createdAt: PropTypes.string,
    newsId: PropTypes.string,
    userId: PropTypes.string,
    insertNewsComment: PropTypes.func,
    onRefresh: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
    this._renderCommentInputBox = this._renderCommentInputBox.bind(this);
    this.send = this.send.bind(this);
  }

  send() {
    const { newsId, userId, onRefresh } = this.props;
    const { text } = this.state;

    if (text !== '') {
      this.props
        .insertNewsComment({
          news_id: newsId,
          user_id: userId,
          content_comment: text,
        })
        .then(onRefresh);

      this.setState({ text: '' });
    } else {
      // TODO: show alert
      console.log('input empty');
    }
  }

  _renderCommentInputBox(userAvatar) {
    let isDisabled = this.state.text === '';

    return (
      <View style={styles.commentInputBoxContainer}>
        <UserAvatar avatar={userAvatar} />
        <View style={styles.commentInputBox}>
          <TextInput
            value={this.state.text}
            placeholder="Type a comment ..."
            placeholderTextColor="#bdc3c7"
            multiline={true}
            underlineColorAndroid="rgba(0,0,0,0)"
            onChangeText={text => this.setState({ text })}
            enablesReturnKeyAutomatically={true}
            returnKeyType="done"
            style={styles.textInputStyle}
          />
          <TouchableOpacity
            style={styles.commentSubmitButton}
            onPress={this.send}
            disabled={isDisabled}
          >
            <Text
              style={[
                styles.sendCommentBtn,
                isDisabled ? {} : { color: Colors.primary },
              ]}
            >
              Send
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  render() {
    const { comments, userAvatar, createdAt } = this.props;

    return (
      <View>
        {comments.map((comment, index) => (
          <Comment comment={comment} key={index} createdAt={createdAt} />
        ))}
        {this._renderCommentInputBox(userAvatar)}
      </View>
    );
  }
}

const InsertNewsCommentWithMutation = graphql(
  gql(MUTATION_INSERT_NEWS_COMMENT),
  {
    props: ({ mutate }) => ({
      insertNewsComment: ({ news_id, user_id, content_comment }) =>
        mutate({
          variables: { news_id, user_id, content_comment },
        }),
    }),
  },
);

export default compose(InsertNewsCommentWithMutation)(Comments);
