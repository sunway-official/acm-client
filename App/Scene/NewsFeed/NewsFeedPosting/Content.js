import React from 'react';
import PropTypes from 'prop-types';
import { View, Image, KeyboardAvoidingView } from 'react-native';
import { Text, UserAvatar } from '~/Component';

import styles from './styles';

const PostsContent = ({ children, avatar, username, images }) => (
  <KeyboardAvoidingView behavior={'padding'} style={styles.content}>
    <View style={styles.contentUserInformation}>
      <UserAvatar small avatar={avatar} />
      <Text bold style={styles.contentUsername}>
        {username}
      </Text>
    </View>
    {children}
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
  </KeyboardAvoidingView>
);

PostsContent.propTypes = {
  avatar: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  username: PropTypes.string,
  children: PropTypes.node,
  images: PropTypes.array,
};

export default PostsContent;
