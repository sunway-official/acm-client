import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { View, Image, TouchableOpacity } from 'react-native';
import { Icon, Avatar } from 'react-native-elements';
import { Text } from '~/Component';
import styles from './styles';
import Comment from './Comment';

class Activity extends Component {
  static propTypes = {};

  constructor(props, context) {
    super(props, context);
    this.state = {
      showCommentBox: false,
      loveColor: false,
    };
    this._handlePressOfComment = this._handlePressOfComment.bind(this);
    this._handlePressOfLove = this._handlePressOfLove.bind(this);
  }

  _handlePressOfComment() {
    this.setState({ showCommentBox: !this.state.showCommentBox }, () => {
      console.log('object: ', this.state.showCommentBox);
    });
  }

  _handlePressOfLove() {
    this.setState({ loveColor: !this.state.loveColor });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.postHeader}>
          <View style={styles.rightPostHeader}>
            <Avatar
              medium
              rounded
              source={{
                uri:
                  'https://www.1plusx.com/app/mu-plugins/all-in-one-seo-pack-pro/images/default-user-image.png',
              }}
              containerStyle={styles.avatar}
            />
            <View>
              <Text bold style={styles.username}>
                Dung Le
              </Text>
              <Text style={styles.time}>5 minutes ago</Text>
            </View>
          </View>
          <TouchableOpacity>
            <Icon name="chevron-down" type="material-community" />
          </TouchableOpacity>
        </View>
        <View>
          <Text>
            I have attended this conference and learned more things from that.
          </Text>
          <Image
            source={{
              uri:
                'http://3oohwq3ybklb1b1ri41mvgfo.wpengine.netdna-cdn.com/wp-content/uploads/Conference-Past-w.jpg',
            }}
            style={styles.photo}
          />
          <View style={styles.interactionContainer}>
            <TouchableOpacity onPress={this._handlePressOfLove}>
              <Icon
                name="heart"
                type="material-community"
                color={this.state.loveColor ? 'red' : 'black'}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={this._handlePressOfComment}>
              <Icon name="comment" type="evilicon" />
            </TouchableOpacity>
          </View>
          {this.state.showCommentBox ? <Comment /> : <View />}
        </View>
      </View>
    );
  }
}

export default Activity;
