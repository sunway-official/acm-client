import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Image, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import moment from 'moment';

class PhotoView extends Component {
  static propTypes = {
    source: PropTypes.object,
    fadeDuration: PropTypes.int,
    minimumZoomScale: PropTypes.float,
    maximumZoomScale: PropTypes.float,
    onTap: PropTypes.func,
  };

  render() {
    return <View />;
  }
}

export default PhotoView;
