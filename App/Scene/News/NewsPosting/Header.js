import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity } from 'react-native';
import { Text } from '~/Component';

import styles from './styles';
import { Colors } from '~/Theme';

const DEFAULT_TOUCHABLE_OPACITY = 0.2;

const PostsHeader = ({ onPressCancel, onPressPost, isDisabled }) => (
  <View style={styles.header}>
    <TouchableOpacity
      activeOpacity={DEFAULT_TOUCHABLE_OPACITY}
      onPress={onPressCancel}
      style={styles.headerGroup}
    >
      <Text bold style={[styles.headerText, { color: Colors.primary }]}>
        Cancel
      </Text>
    </TouchableOpacity>
    <View>{/* TODO: Header title*/}</View>
    <TouchableOpacity
      activeOpacity={isDisabled ? 1 : DEFAULT_TOUCHABLE_OPACITY}
      onPress={() => isDisabled || onPressPost()}
      style={styles.headerGroup}
    >
      <Text
        bold
        style={[
          styles.headerText,
          isDisabled ? { color: Colors.grey } : { color: Colors.primary },
        ]}
      >
        Post
      </Text>
    </TouchableOpacity>
  </View>
);

PostsHeader.propTypes = {
  onPressCancel: PropTypes.func,
  onPressPost: PropTypes.func,
  isDisabled: PropTypes.bool,
};

export default PostsHeader;
