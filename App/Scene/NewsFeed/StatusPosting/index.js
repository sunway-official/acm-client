import React from 'react';
// import PropTypes from 'prop-types';
import { View, TouchableOpacity, TextInput } from 'react-native';
import { Icon } from 'react-native-elements';
import { UserAvatar, TouchableView, Text } from '~/Component';
import { Colors } from '~/Theme';
import { defaultUserAvatar } from '../fixture';
import styles from './styles';

const StatusPosting = () => {
  return (
    <View style={styles.container}>
      <UserAvatar small avatar={defaultUserAvatar} />
      <TouchableView
        rippleColor={Colors.secondary}
        style={styles.statusBoxView}
      >
        <TextInput
          style={[styles.placeholderStyle]}
          placeholder="What's on your mind?"
          underlineColorAndroid="transparent"
        />
      </TouchableView>
      <TouchableOpacity>
        <Icon name="camera" type="material-community" />
      </TouchableOpacity>
    </View>
  );
};

StatusPosting.propTypes = {};

export default StatusPosting;
