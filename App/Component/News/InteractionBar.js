import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity } from 'react-native';
import { Text } from 'Component';

import { Icon } from 'react-native-elements';
import { Colors, Metrics } from 'Theme';
import styles from './styles';

const NewsRenderIcon = ({ name, type, color }) => (
  <Icon
    name={name}
    type={type}
    color={color}
    marginRight={Metrics.smallMargin}
  />
);

const NewsInteraction = ({ onPressHandler, icon, text, isDisabledLike }) => (
  <TouchableOpacity
    onPress={onPressHandler}
    style={styles.interaction}
    disabled={isDisabledLike}
  >
    {icon}
    <Text style={styles.secondaryText}>{text}</Text>
  </TouchableOpacity>
);

const NewsInteractionBar = ({
  isLiked,
  numberOfLikes,
  isDisabledLike,
  numberOfComments,
  onPressLike,
  onPressComment,
}) => (
  <View style={styles.interactionBarContainer}>
    <NewsInteraction
      onPressHandler={onPressLike}
      icon={
        isLiked ? (
          <NewsRenderIcon
            name={'ios-heart'}
            type={'ionicon'}
            color={Colors.red}
          />
        ) : (
          <NewsRenderIcon name={'ios-heart-outline'} type={'ionicon'} />
        )
      }
      text={numberOfLikes}
      isDisabledLike={isDisabledLike}
    />
    <NewsInteraction
      onPressHandler={onPressComment}
      icon={<NewsRenderIcon name={'comment'} type={'evilicon'} />}
      text={numberOfComments}
      isDisabledLike={isDisabledLike}
    />
  </View>
);

NewsRenderIcon.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  color: PropTypes.string,
};

NewsInteraction.propTypes = {
  onPressHandler: PropTypes.func,
  isDisabledLike: PropTypes.bool,
  icon: PropTypes.object,
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

NewsInteractionBar.propTypes = {
  isLiked: PropTypes.bool,
  isDisabledLike: PropTypes.bool,
  numberOfLikes: PropTypes.number,
  numberOfComments: PropTypes.number,
  onPressLike: PropTypes.func,
  onPressComment: PropTypes.func,
};

export default NewsInteractionBar;
