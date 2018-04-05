import React from 'react';
import { View, Image, TouchableOpacity, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import Text from '../Text';
import { Images } from 'Theme';
import styles from './styles';

const EMPTY_TEXT_DEFAULT = 'Your collection is empty';

const _checkText = text => {
  return text === undefined || text === null || text === '';
};

const EmptyCollection = props => {
  return (
    <View style={[styles.container, props.customStyles]}>
      <Image
        style={[styles.notFoundIcon, props.iconStyles]}
        source={Images.notFoundIcon}
      />
      <View style={styles.subText}>
        <Text
          bold
          italic
          style={[styles.headerSubText, styles.text, props.headerSubTextStyle]}
        >
          {`Oops!`}
        </Text>
        <Text
          style={[
            styles.descriptionText,
            styles.text,
            props.descriptionTextStyle,
          ]}
        >
          {_checkText(props.emptyText) ? EMPTY_TEXT_DEFAULT : props.emptyText}
        </Text>
        {props.reloadable && (
          <TouchableOpacity activeOpacity={0.3} onPress={props.onReload}>
            <Text bold style={styles.reloadableText}>
              Reload
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

EmptyCollection.propTypes = {
  customStyles: ViewPropTypes.style,
  iconStyles: ViewPropTypes.style,
  headerSubTextStyle: ViewPropTypes.style,
  descriptionTextStyle: ViewPropTypes.style,
  emptyText: PropTypes.string,
  reloadable: PropTypes.bool,
  onReload: PropTypes.func,
};

export default EmptyCollection;
