import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, ImageBackground, Image } from 'react-native';
import { Text, TouchableView } from '~/Component';
import { S3_GET_PREFIX } from '~/env';

import styles from './styles';

const TYPES = {
  COMPACT: 'compact',
  FULL: 'full',
};

const NewsRenderPhotoImage = ({ imageUrl, style, children }) => (
  <ImageBackground source={{ uri: S3_GET_PREFIX + imageUrl }} style={style}>
    {children}
  </ImageBackground>
);

const SingleImageView = ({ imageUrl }) => (
  <NewsRenderPhotoImage
    imageUrl={imageUrl[0]}
    style={styles.singleCoverImage}
  />
);

const SecondImageView = ({ imageUrl }) => (
  <View style={styles.secondImageContainer}>
    <NewsRenderPhotoImage
      imageUrl={imageUrl[0]}
      style={styles.secondImageView}
    />
    <NewsRenderPhotoImage
      imageUrl={imageUrl[1]}
      style={styles.secondImageView}
    />
  </View>
);

const ThirdImageViewCompact = ({ imageUrl, onPressMore }) => (
  <View style={styles.thirdImageContainer}>
    <View style={styles.thirdImageCoverContainer}>
      <NewsRenderPhotoImage
        imageUrl={imageUrl[0]}
        style={styles.thirdCoverImage}
      />
    </View>
    <View style={styles.thirdImageSubContainer}>
      <NewsRenderPhotoImage
        imageUrl={imageUrl[1]}
        style={styles.thirdSmallImageTop}
      />
      <TouchableView onPress={onPressMore}>
        <NewsRenderPhotoImage
          imageUrl={imageUrl[2]}
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

const PhotoViewFull = ({ imageUrl }) => {
  const photoViewList = [];

  imageUrl.map((url, index) => {
    photoViewList.push(
      <NewsRenderPhotoImage
        key={index}
        imageUrl={url}
        style={styles.singleCoverImage}
      />,
    );
  });

  return <View>{photoViewList}</View>;
};

class NewsPhotoView extends PureComponent {
  render() {
    const { imageUrl, onPressMore } = this.props;

    let renderType = '';

    for (let key in TYPES) {
      const type = TYPES[key];
      if (this.props[type] === true) {
        renderType += type;
      }
    }

    return renderType === TYPES.COMPACT ? (
      imageUrl.length === 1 ? (
        <SingleImageView imageUrl={imageUrl} />
      ) : imageUrl.length === 2 ? (
        <SecondImageView imageUrl={imageUrl} />
      ) : imageUrl.length > 2 ? (
        <ThirdImageViewCompact imageUrl={imageUrl} onPressMore={onPressMore} />
      ) : (
        <View />
      )
    ) : (
      <PhotoViewFull imageUrl={imageUrl} />
    );
  }
}

NewsRenderPhotoImage.propTypes = {
  imageUrl: PropTypes.string,
  style: Image.propTypes.style,
  children: PropTypes.any,
};

SingleImageView.propTypes = {
  imageUrl: PropTypes.array,
};

SecondImageView.propTypes = {
  imageUrl: PropTypes.array,
};

ThirdImageViewCompact.propTypes = {
  imageUrl: PropTypes.array,
  onPressMore: PropTypes.func,
};

PhotoViewFull.propTypes = {
  imageUrl: PropTypes.array,
  onPressMore: PropTypes.func,
};

NewsPhotoView.propTypes = {
  imageUrl: PropTypes.array,
  onPressMore: PropTypes.func,
};

// Loop throght TYPES to define its proptypes
Object.keys(TYPES).map(key => {
  NewsPhotoView.propTypes[TYPES[key]] = PropTypes.bool;
});

export default NewsPhotoView;
