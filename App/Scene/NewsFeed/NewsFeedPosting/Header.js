import React from 'react';
import PropTypes from 'prop-types';
import { View, Keyboard } from 'react-native';
import { Text, TouchableView } from '~/Component';

import styles from './styles';
import { Colors } from '~/Theme';

const PostsHeader = ({ onPressCancel, onPressPost, isDisabled }) => (
  <View style={styles.header}>
    <TouchableView
      onPress={onPressCancel}
      borderless={true}
      style={{ padding: 8 }}
    >
      <Text bold style={{ color: Colors.primary }}>
        Cancel
      </Text>
    </TouchableView>
    <TouchableView onPress={() => Keyboard.dismiss()}>
      <Text bold medium>
        Update Status
      </Text>
    </TouchableView>
    <TouchableView
      onPress={onPressPost}
      disabled={isDisabled}
      borderless={true}
      style={{ padding: 8 }}
    >
      <Text
        bold
        style={isDisabled ? { color: Colors.grey } : { color: Colors.primary }}
      >
        Post
      </Text>
    </TouchableView>
  </View>
);

PostsHeader.propTypes = {
  onPressCancel: PropTypes.func,
  onPressPost: PropTypes.func,
  isDisabled: PropTypes.bool,
};

export default PostsHeader;
