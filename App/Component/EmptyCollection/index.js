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

const EmptyCollection = ({ customStyles, emptyText }) => {
  return (
    <View style={[styles.container, customStyles]}>
      <Image style={styles.notFoundIcon} source={Images.notFoundIcon} />
      <View style={styles.subText}>
        <Text bold italic style={[styles.headerSubText, styles.text]}>
          {`"Oops"!`}
        </Text>
        <Text style={[styles.descriptionText, styles.text]}>
          {_checkText(emptyText) ? EMPTY_TEXT_DEFAULT : emptyText}
        </Text>
      </View>
    </View>
  );
};

EmptyCollection.propTypes = {
  customStyles: View.propTypes.style,
  emptyText: PropTypes.string,
};

export default EmptyCollection;
