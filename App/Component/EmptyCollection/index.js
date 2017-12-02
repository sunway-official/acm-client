import React from 'react';
import { View, Image } from 'react-native';
import PropTypes from 'prop-types';
import Text from '../Text';
import { Images } from '~/Theme';
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
      </View>
    </View>
  );
};

EmptyCollection.propTypes = {
  customStyles: View.propTypes.style,
  iconStyles: View.propTypes.style,
  headerSubTextStyle: View.propTypes.style,
  descriptionTextStyle: View.propTypes.style,
  emptyText: PropTypes.string,
};

export default EmptyCollection;
