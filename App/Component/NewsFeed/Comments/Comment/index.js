import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { Text } from '~/Component';
import { Colors, Metrics } from '../../../../Theme';
import styles from './styles';
import UserAvatar from '../../UserAvatar';

class Comment extends Component {
  static propTypes = {
    comment: PropTypes.object,
  };

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

  _renderComments(comment) {
    return (
      <View style={styles.commentContainer}>
        <UserAvatar avatar={comment.avatar} />
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
                <Text
                  style={{
                    color: this.state.loveComment ? Colors.red : Colors.grey,
                  }}
                >
                  Love
                </Text>
              </TouchableOpacity>
            </View>
            <View flexDirection="row" alignItems="center">
              <Icon
                name="ios-heart"
                type="ionicon"
                color={Colors.red}
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

  render() {
    const { comment } = this.props;
    return (
      <View>
        {this._renderComments(comment)}
      </View>
    );
  }
}

export default Comment;
