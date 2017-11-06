import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import { ImagePicker } from 'expo';

import styles from './styles';
import { Colors } from '~/Theme';
import {
  UserAvatar,
  TouchableView,
  Text,
  Modal,
  AutoExpandingTextInput,
} from '~/Component';

// Posts.

class Posts extends Component {
  static propTypes = {
    isVisible: PropTypes.bool,
    handlePost: PropTypes.func.isRequired,
    handleCancel: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    avatar: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      text: '',
      images: [],
    };

    this._handlePost = this._handlePost.bind(this);
    this._handleCancel = this._handleCancel.bind(this);
  }

  _handlePost() {
    const { text, images } = this.state;
    this.props.handlePost(text, images);
    this._handleCancel();
  }

  _handleCancel() {
    this.setState({ text: '', images: [] });
    this.props.handleCancel();
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      base64: true,
    });

    if (!result.cancelled) {
      imageTemp = this.state.images;
      imageTemp.push(result);
      this.setState({ images: imageTemp });
    }
  };

  _renderHeader() {
    const { text, images } = this.state;
    let isDisabled = text === '' && images.length === 0;

    return (
      <View style={styles.header}>
        <TouchableView onPress={this._handleCancel}>
          <Text bold style={{ color: Colors.primary }}>
            Cancel
          </Text>
        </TouchableView>
        <Text bold medium>
          Update Status
        </Text>
        <TouchableView onPress={this._handlePost} disabled={isDisabled}>
          <Text
            bold
            style={
              isDisabled ? { color: Colors.grey } : { color: Colors.primary }
            }
          >
            Post
          </Text>
        </TouchableView>
      </View>
    );
  }

  _renderContents(username, avatar) {
    let { images } = this.state;

    return (
      <View style={styles.content}>
        <View style={styles.contentUserInformation}>
          <UserAvatar small avatar={avatar} />
          <Text bold style={styles.contentUsername}>
            {username}
          </Text>
        </View>
        <AutoExpandingTextInput
          value={this.state.text}
          placeholder={"What's on your mind?"}
          onChangeText={text => this.setState({ text })}
          enablesReturnKeyAutomatically={true}
          returnKeyType="done"
        />
        <View style={styles.imagesContainer}>
          {images &&
            images.map((image, index) => (
              <Image
                key={index}
                source={{ uri: image.uri }}
                style={styles.imageUploaded}
              />
            ))}
        </View>
      </View>
    );
  }

  _renderActions() {
    return (
      <View style={styles.action}>
        <TouchableView
          rippleColor={Colors.primary}
          borderless={true}
          onPress={this._pickImage}
        >
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
    const { isVisible, username, avatar } = this.props;

    return (
      <Modal
        animationIn="slideInUp"
        animationOut="slideOutDown"
        isVisible={isVisible}
        style={styles.container}
      >
        {this._renderHeader()}
        {this._renderContents(username, avatar)}
        {this._renderActions()}
      </Modal>
    );
  }
}

export default Posts;
