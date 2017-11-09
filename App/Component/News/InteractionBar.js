import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity } from 'react-native';
import { Text } from '~/Component';

import { Icon } from 'react-native-elements';
import { Colors, Metrics } from '~/Theme';
import styles from './styles';

const NewsRenderIcon = ({ name, type, color }) => (
  <Icon
    name={name}
    type={type}
    color={color}
    marginRight={Metrics.smallMargin}
  />
);

const NewsInteraction = ({ onPressHandler, icon, text, isDisabledLove }) => (
  <TouchableOpacity
    onPress={onPressHandler}
    style={styles.interaction}
    disabled={isDisabledLove}
  >
    {icon}
    <Text style={styles.secondaryText}>{text}</Text>
  </TouchableOpacity>
);

const NewsInteractionBar = ({
  isLove,
  numberOfLove,
  isDisabledLove,
  numberOfComments,
  onPressLove,
  onPressComment,
}) => (
  <View style={styles.interactionBarContainer}>
    <NewsInteraction
      onPressHandler={onPressLove}
      icon={
        isLove ? (
          <NewsRenderIcon
            name={'ios-heart'}
            type={'ionicon'}
            color={Colors.red}
          />
        ) : (
          <NewsRenderIcon name={'ios-heart-outline'} type={'ionicon'} />
        )
      }
      text={numberOfLove}
      isDisabledLove={isDisabledLove}
    />
    <NewsInteraction
      onPressHandler={onPressComment}
      icon={<NewsRenderIcon name={'comment'} type={'evilicon'} />}
      text={numberOfComments}
      isDisabledLove={isDisabledLove}
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
  isDisabledLove: PropTypes.bool,
  icon: PropTypes.object,
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

NewsInteractionBar.propTypes = {
  isLove: PropTypes.bool,
  isDisabledLove: PropTypes.bool,
  numberOfLove: PropTypes.number,
  numberOfComments: PropTypes.number,
  onPressLove: PropTypes.func,
  onPressComment: PropTypes.func,
};

export default NewsInteractionBar;
