import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity } from 'react-native';
import { Text } from '~/Component';

import styles from './styles';
import { Colors } from '~/Theme';

const PostsHeader = ({ onPressCancel, onPressPost, isDisabled }) => (
  <View style={styles.header}>
    <TouchableOpacity onPress={onPressCancel} style={{ padding: 8 }}>
      <Text bold style={[styles.headerText, { color: Colors.primary }]}>
        Cancel
      </Text>
    </TouchableOpacity>
    <View>{/* TODO: Header title*/}</View>
    <TouchableOpacity
      onPress={() => isDisabled || onPressPost()}
      style={{ padding: 8 }}
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
