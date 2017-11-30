import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import Comment from './Comment';

class Comments extends Component {
  static propTypes = {
    comments: PropTypes.array,
    createdAt: PropTypes.string,
  };
  render() {
    const { comments, createdAt } = this.props;

    return (
      <View>
        {comments.map((comment, index) => (
          <Comment comment={comment} key={index} createdAt={createdAt} />
        ))}
      </View>
    );
  }
}

export default Comments;
