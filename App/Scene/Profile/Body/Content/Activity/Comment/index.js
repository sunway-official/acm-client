import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Image, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { Text } from '~/Component';
import comments from './fixture';

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loveComment: false,
    };
    this._renderComments = this._renderComments.bind(this);
    this._handlePressOfLove = this._handlePressOfLove.bind(this);
  }

  _handlePressOfLove() {
    this.setState({ loveComment: !this.state.loveComment });
  }

  _renderComments(comment, index) {
    return (
      <View style={{ flexDirection: 'row', marginVertical: 16 }} key={index}>
        <Image
          source={{
            uri: comment.avatar,
          }}
          style={{ width: 50, height: 50, borderRadius: 25 }}
        />
        <View style={{ flex: 1, marginLeft: 16 }}>
          <View style={{ flexDirection: 'row' }}>
            <Text bold>
              {comment.username}
            </Text>
            <Icon name="dot-single" type="entypo" color="grey" />
            <Text style={{ color: 'grey' }}>
              {comment.time}
            </Text>
          </View>
          <Text>
            {comment.comment}
          </Text>
          <View style={{ flexDirection: 'row', marginTop: 8 }}>
            <TouchableOpacity>
              <Text style={{ color: 'grey', marginRight: 28 }}>Reply</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this._handlePressOfLove}>
              {this.state.loveComment
                ? <Icon name="heart" type="material-community" color="red" />
                : <Text style={{ color: 'grey' }}>Love</Text>}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  render() {
    return (
      <View>
        {comments.map((comment, index) => this._renderComments(comment, index))}
      </View>
    );
  }
}

Comment.propTypes = {};

export default Comment;
