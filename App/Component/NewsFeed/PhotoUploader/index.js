import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Text } from '~/Component';

class PhotoUploader extends Component {
  static propTypes = {};

  render() {
    return (
      <View>
        <Text>Photo Uploader</Text>
      </View>
    );
  }
}

export default PhotoUploader;
