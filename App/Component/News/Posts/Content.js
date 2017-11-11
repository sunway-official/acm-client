import React from 'react';
import PropTypes from 'prop-types';
import { View, Image } from 'react-native';
import { Text, UserAvatar } from '~/Component';

import styles from './styles';

const PostsContent = ({ children, avatar, username, images }) => (
  <View style={styles.content}>
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
  </View>
);

PostsContent.propTypes = {
  avatar: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  username: PropTypes.string,
  children: PropTypes.node.isRequired,
  images: PropTypes.array,
};

export default PostsContent;
