import React from 'react';
import { View, Image } from 'react-native';
import Text from '../Text';
import { Images } from '~/Theme';
import styles from './styles';

const EmptyCollection = ({ customStyles }) => {
  return (
    <View style={[styles.container, customStyles]}>
      <Image style={styles.notFoundIcon} source={Images.notFoundIcon} />
      <View style={styles.subText}>
        <Text bold italic style={[styles.headerSubText, styles.text]}>
          {`"Ups"!`}
        </Text>
        <Text style={[styles.descriptionText, styles.text]}>
          Your collection is empty.
        </Text>
      </View>
    </View>
  );
};

EmptyCollection.propTypes = {
  customStyles: View.propTypes.style,
};

export default EmptyCollection;
