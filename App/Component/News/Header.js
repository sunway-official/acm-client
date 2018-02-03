import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { Text, UserAvatar } from 'Component';

import styles from './styles';

const NewsHeader = ({ avatar, gender, username, createdAt }) => (
  <View style={styles.postHeader}>
    <View style={styles.rightPostHeader}>
      <UserAvatar
        small
        avatar={avatar}
        gender={gender}
        containerStyle={styles.avatar}
      />
      <View>
        <Text style={styles.username}>{username}</Text>
        <Text style={styles.secondaryText}>{createdAt}</Text>
      </View>
    </View>
    <TouchableOpacity>
      <Icon name="chevron-down" type="material-community" />
    </TouchableOpacity>
  </View>
);

NewsHeader.propTypes = {
  avatar: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  gender: PropTypes.string,
  username: PropTypes.string,
  createdAt: PropTypes.string,
};

export default NewsHeader;
