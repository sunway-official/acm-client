import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Icon } from 'react-native-elements';
import { Text, TouchableView } from '~/Component';

import styles from './styles';
import { Colors, Metrics } from '~/Theme';

const PostsActions = ({
  onPressAlbum,
  onPressUploadImage,
  onPressCaptureImage,
}) => (
  <View style={styles.actions}>
    <TouchableView
      style={styles.actionItem}
      rippleColor={Colors.primary}
      borderless={true}
      onPress={onPressAlbum}
    >
      <Icon
        color={Colors.grey}
        name="md-photos"
        type="ionicon"
        size={Metrics.icons.small}
      />
      <Text style={styles.actionText}>Album</Text>
    </TouchableView>
    <TouchableView
      style={styles.actionItem}
      rippleColor={Colors.primary}
      borderless={true}
      onPress={onPressUploadImage}
    >
      <Icon
        color={Colors.grey}
        name="md-photos"
        type="ionicon"
        size={Metrics.icons.small}
      />
      <Text style={styles.actionText}>Photo</Text>
    </TouchableView>
    <TouchableView
      style={styles.actionItem}
      rippleColor={Colors.primary}
      borderless={true}
      onPress={onPressCaptureImage}
    >
      <Icon
        color={Colors.grey}
        name="camera"
        type="material-community"
        size={Metrics.icons.small}
      />
      <Text style={styles.actionText}>Camera</Text>
    </TouchableView>
  </View>
);

PostsActions.propTypes = {
  onPressUploadImage: PropTypes.func,
  onPressCaptureImage: PropTypes.func,
  onPressAlbum: PropTypes.func,
};

export default PostsActions;
