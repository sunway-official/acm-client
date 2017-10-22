import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Icon } from 'react-native-elements';

import styles from './styles';
import { Colors, Images } from '~/Theme';
import {
  UserAvatar,
  TouchableView,
  Text,
  Modal,
  AutoExpandingTextInput,
} from '~/Component';

const defaultAvatar = Images.avatar['male08'];

class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };

    this.post = this.post.bind(this);
  }

  post() {
    this.props.post(this.state.text);
    this.setState({ text: '' });
    this.props.cancel();
  }

  _renderHeader() {
    return (
      <View style={styles.header}>
        <TouchableView onPress={this.props.cancel}>
          <Text bold style={{ color: Colors.primary }}>
            Cancel
          </Text>
        </TouchableView>
        <Text bold medium>
          Update Status
        </Text>
        <TouchableView
          onPress={this.post}
          disabled={this.state.text === '' ? true : false}
        >
          <Text
            bold
            style={
              this.state.text === ''
                ? { color: Colors.grey }
                : { color: Colors.primary }
            }
          >
            Post
          </Text>
        </TouchableView>
      </View>
    );
  }

  _renderContents() {
    const { username } = this.props;

    return (
      <View style={styles.content}>
        <View style={styles.contentUserInformation}>
          <UserAvatar small avatar={defaultAvatar} />
          <Text bold style={styles.contentUsername}>
            {this.props.username}
          </Text>
        </View>
        <AutoExpandingTextInput
          value={this.state.text}
          placeholder={"What's on your mind?"}
          onChangeText={text => this.setState({ text })}
          enablesReturnKeyAutomatically={true}
          returnKeyType="done"
        />
      </View>
    );
  }

  _renderActions() {
    return (
      <View style={styles.action}>
        <TouchableView rippleColor={Colors.primary} borderless={true}>
          <Icon name="md-photos" type="ionicon" />
          <Text>Photo</Text>
        </TouchableView>
        <TouchableView rippleColor={Colors.primary} borderless={true}>
          <Icon name="camera" type="material-community" />
          <Text>Camera</Text>
        </TouchableView>
      </View>
    );
  }

  render() {
    const isVisible = this.props.isVisible;

    return (
      <Modal
        animationIn="slideInUp"
        animationOut="slideOutDown"
        animationInTiming={500}
        animationOutTiming={500}
        isVisible={isVisible}
        style={styles.container}
      >
        {this._renderHeader()}
        {this._renderContents()}
        {this._renderActions()}
      </Modal>
    );
  }
}

Posts.propTypes = {
  isVisible: PropTypes.bool,
  post: PropTypes.func.isRequired,
  cancel: PropTypes.func,
  username: PropTypes.string,
};

export default Posts;
