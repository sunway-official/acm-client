import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ImagePicker } from 'expo';

import styles from './styles';
import { Modal, AutoExpandingTextInput } from '~/Component';

import PostsHeader from './Header';
import PostContent from './Content';
import PostActions from './Actions';

const ImagePickerConfig = {
  allowsEditing: true,
  aspect: [4, 3],
  base64: true,
};

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
    this._handlePickImage = this._handlePickImage.bind(this);
    this._handleCaptureImage = this._handleCaptureImage.bind(this);
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

  _pushImagesToArray(result) {
    imageTemp = this.state.images;
    imageTemp.push(result);
    this.setState({ images: imageTemp });
  }

  async _handlePickImage() {
    let result = await ImagePicker.launchImageLibraryAsync(ImagePickerConfig);
    if (!result.cancelled) {
      await this._pushImagesToArray(result);
    }
  }

  async _handleCaptureImage() {
    let result = await ImagePicker.launchCameraAsync(ImagePickerConfig);
    if (!result.cancelled) {
      await this._pushImagesToArray(result);
    }
  }

  _renderHeader() {
    const { text, images } = this.state;
    let isDisabled = text === '' && images.length === 0;
    console.log(isDisabled);

    return (
      <PostsHeader
        onPressCancel={this._handleCancel}
        onPressPost={this._handlePost}
        isDisabled={isDisabled}
      />
    );
  }

  _renderContents(username, avatar) {
    let { images } = this.state;

    return (
      <PostContent avatar={avatar} images={images}>
        <AutoExpandingTextInput
          value={this.state.text}
          placeholder={"What's on your mind?"}
          onChangeText={text => this.setState({ text })}
          enablesReturnKeyAutomatically={true}
          returnKeyType="done"
        />
      </PostContent>
    );
  }

  _renderActions() {
    return (
      <PostActions
        onPressUploadImage={this._handlePickImage}
        onPressCaptureImage={this._handleCaptureImage}
      />
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
