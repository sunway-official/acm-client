import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Icon } from 'react-native-elements';
import { Text, TouchableView } from '~/Component';

import styles from './styles';
import { Colors } from '~/Theme';

const PostsActions = ({ onPressUploadImage, onPressCaptureImage }) => (
  <View style={styles.action}>
    <TouchableView
      rippleColor={Colors.primary}
      borderless={true}
      onPress={onPressUploadImage}
    >
      <Icon name="md-photos" type="ionicon" />
      <Text>Photo</Text>
    </TouchableView>
    <TouchableView
      rippleColor={Colors.primary}
      borderless={true}
      onPress={onPressCaptureImage}
    >
      <Icon name="camera" type="material-community" />
      <Text>Camera</Text>
    </TouchableView>
  </View>
);

PostsActions.propTypes = {
  onPressUploadImage: PropTypes.func,
  onPressCaptureImage: PropTypes.func,
};

export default PostsActions;
