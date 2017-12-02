import React from 'react';
import PropTypes from 'prop-types';
import { View, Image } from 'react-native';
import { Text, UserAvatar } from '~/Component';

import styles from './styles';

const PostsContent = ({
  children,
  avatar,
  username,
  gender,
  images,
  position,
  organization,
}) => (
  <View style={styles.content}>
    <View style={styles.contentUserInformation}>
      <UserAvatar small avatar={avatar} gender={gender} />
      <View style={styles.contentUsername}>
        <Text bold>{username}</Text>
        <Text>
          {position} at {organization}
        </Text>
      </View>
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
  gender: PropTypes.string,
  username: PropTypes.string,
  children: PropTypes.node,
  images: PropTypes.array,
  position: PropTypes.string,
  organization: PropTypes.string,
};

export default PostsContent;
