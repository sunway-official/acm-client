import React from 'react';
// import PropTypes from 'prop-types';
import { View, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { UserAvatar, TouchableView, Text } from '~/Component';
import { Colors } from '~/Theme';
import { DEFAULT_USER_AVATAR } from '../fixture';
import styles from './styles';

const StatusPosting = () => {
  return (
    <View style={styles.container}>
      <UserAvatar small avatar={DEFAULT_USER_AVATAR} />
      <TouchableView
        rippleColor={Colors.secondary}
        style={styles.statusBoxView}
      >
        <Text style={styles.placeholderStyle}>
          {"What's on your mind?"}
        </Text>
      </TouchableView>
      <TouchableOpacity>
        <Icon name="camera" type="material-community" />
      </TouchableOpacity>
    </View>
  );
};

StatusPosting.propTypes = {};

export default StatusPosting;
