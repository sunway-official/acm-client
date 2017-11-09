import React from 'react';
import PropTypes from 'prop-types';
import { View, Image } from 'react-native';
import { Text, TouchableView } from '~/Component';
import { S3_GET_PREFIX } from '~/env';

import styles from './styles';

const NewsRenderPhotoImage = ({ imageUrl, position, styles }) => {
  return (
    <Image
      source={{ uri: S3_GET_PREFIX + imageUrl[position] }}
      style={styles}
    />
  );
};

const NewsPhotoView = ({ imageUrl }) => {
  if (imageUrl.length === 1)
    return (
      <NewsRenderPhotoImage
        imageUrl={imageUrl}
        position={0}
        styles={styles.coverSingleImage}
      />
    );

  if (imageUrl.length === 2)
    return (
      <View style={styles.photoViewTwoImage}>
        <NewsRenderPhotoImage
          imageUrl={imageUrl}
          position={0}
          style={styles.firstMediumImage}
        />
        <NewsRenderPhotoImage
          imageUrl={imageUrl}
          position={1}
          style={styles.secondMediumImage}
        />
      </View>
    );
  if (imageUrl.length > 2)
    return (
      <View style={styles.photoViewContainer}>
        <View style={{ flex: 2 }}>
          <NewsRenderPhotoImage
            imageUrl={imageUrl}
            position={0}
            style={styles.coverImage}
          />
        </View>
        <View style={styles.photoViewSubContainer}>
          <NewsRenderPhotoImage
            imageUrl={imageUrl}
            position={1}
            style={styles.smallImage}
          />
          {imageUrl.length > 2 ? (
            <TouchableView>
              <NewsRenderPhotoImage
                imageUrl={imageUrl}
                position={2}
                style={styles.smallImage}
              />
              <Text medium style={styles.moreImages}>{`+ ${imageUrl.length -
                2}`}</Text>
            </TouchableView>
          ) : (
            <NewsRenderPhotoImage
              imageUrl={imageUrl}
              position={1}
              style={styles.smallImage}
            />
          )}
        </View>
      </View>
    );
  return <View />;
};

NewsRenderPhotoImage.propTypes = {
  imageUrl: PropTypes.array,
  position: PropTypes.number,
  styles: PropTypes.number,
};

NewsPhotoView.propTypes = {
  imageUrl: PropTypes.array,
};

export default NewsPhotoView;
