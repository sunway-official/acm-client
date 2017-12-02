import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, Image } from 'react-native';
import { Text, TouchableView } from '~/Component';
import { S3_GET_PREFIX } from '~/env';

import styles from './styles';

class NewsRenderPhotoImage extends PureComponent {
  static propTypes = {
    children: PropTypes.any,
    style: View.propTypes.style,
  };

  render() {
    const { imageUrl, position, style, children } = this.props;
    return (
      <Image source={{ uri: S3_GET_PREFIX + imageUrl[position] }} style={style}>
        {children}
      </Image>
    );
  }
}

const NewsPhotoView = ({ imageUrl }) => {
  if (imageUrl.length === 1)
    return (
      <NewsRenderPhotoImage
        imageUrl={imageUrl}
        position={0}
        style={styles.singleCoverImage}
      />
    );

  if (imageUrl.length === 2)
    return (
      <View style={styles.secondImageContainer}>
        <NewsRenderPhotoImage
          imageUrl={imageUrl}
          position={0}
          style={styles.secondImageView}
        />
        <NewsRenderPhotoImage
          imageUrl={imageUrl}
          position={1}
          style={styles.secondImageView}
        />
      </View>
    );
  if (imageUrl.length > 2)
    return (
      <View style={styles.thirdImageContainer}>
        <View style={styles.thirdImageCoverContainer}>
          <NewsRenderPhotoImage
            imageUrl={imageUrl}
            position={0}
            style={styles.thirdCoverImage}
          />
        </View>
        <View style={styles.thirdImageSubContainer}>
          <NewsRenderPhotoImage
            imageUrl={imageUrl}
            position={1}
            style={styles.thirdSmallImageTop}
          />
          <TouchableView>
            <NewsRenderPhotoImage
              imageUrl={imageUrl}
              position={2}
              style={styles.thirdSmallImageBottom}
            >
              <View style={styles.thirdBackdropView}>
                <Text
                  medium
                  style={styles.thirdTextAboveBackdropView}
                >{`+${imageUrl.length - 2}`}</Text>
              </View>
            </NewsRenderPhotoImage>
          </TouchableView>
        </View>
      </View>
    );
  return <View />;
};

NewsRenderPhotoImage.propTypes = {
  imageUrl: PropTypes.array,
  position: PropTypes.number,
  style: Image.propTypes.style,
};

NewsPhotoView.propTypes = {
  imageUrl: PropTypes.array,
};

export default NewsPhotoView;
