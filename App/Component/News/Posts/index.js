import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Image } from 'react-native';
import { Icon } from 'react-native-elements';

import { ImagePicker } from 'expo';

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
      images: [],
    };

    this.post = this.post.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  post() {
    this.props.post(this.state.text);
    this.setState({ text: '' });
    this.props.cancel();
  }

  cancel() {
    this.setState({ text: '', images: [] });
    this.props.cancel();
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    imageTemp = this.state.images;
    imageTemp.push(result.uri);

    if (!result.cancelled) {
      this.setState({ images: imageTemp });
    }
  };

  _renderHeader() {
    const { text, images } = this.state;

    return (
      <View style={styles.header}>
        <TouchableView onPress={this.cancel}>
          <Text bold style={{ color: Colors.primary }}>
            Cancel
          </Text>
        </TouchableView>
        <Text bold medium>
          Update Status
        </Text>
        <TouchableView onPress={this.post} disabled={text ? true : false}>
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
    let { images } = this.state;

    // TODO: remove when merge code
    console.log(images);

    return (
      <View style={styles.content}>
        <View style={styles.contentUserInformation}>
          <UserAvatar small avatar={defaultAvatar} />
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
                source={{ uri: image }}
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
