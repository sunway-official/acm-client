import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import moment from 'moment';

import { Text, UserAvatar } from '~/Component';
import { Colors, Metrics } from '~/Theme';
import styles from './styles';

class Comment extends Component {
  static propTypes = {
    comment: PropTypes.object,
    createdAt: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      loveComment: false,
    };
    this._renderComments = this._renderComments.bind(this);
    this._onPressLove = this._onPressLove.bind(this);
  }

  _onPressLove() {
    this.setState({ loveComment: !this.state.loveComment });
  }

  _renderComments(comment, createdAt) {
    // let secondaryText = moment(comment.updated_at).fromNow();

    return (
      <View style={styles.commentContainer}>
        <UserAvatar avatar={comment.user.avatar} />
        <View style={styles.rightOfComment}>
          <View flexDirection="row">
            <Text bold>
              {`${comment.user.firstname} ${comment.user.lastname}`}
            </Text>
            <Icon name="dot-single" type="entypo" color="grey" />
            <Text style={styles.textColor}>
              {createdAt}
            </Text>
          </View>
          <Text>
            {comment.content}
          </Text>
          <View style={styles.rightFooterOfComment}>
            <View style={styles.interactionContainer}>
              <TouchableOpacity>
                <Text style={styles.replyTextStyle}>Reply</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this._onPressLove}>
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
                marginRight={Metrics.baseMargin}
              />
              <Text>
                {'2'}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }

  render() {
    const { comment, createdAt } = this.props;
    return (
      <View>
        {this._renderComments(comment, createdAt)}
      </View>
    );
  }
}

export default Comment;
