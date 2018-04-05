import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Text, UserAvatar } from 'Component';
import { transformText, transformDate } from 'Transformer';
import { Colors } from 'Theme';

import styles from './styles';

const CHAR_LENGTH = 45;

class NotificationItem extends Component {
  render() {
    const {
      content,
      title,
      sender: { firstname, lastname, avatar, gender },
      updated_at,
      read,
    } = this.props;

    let markAsRead = read ? null : { backgroundColor: Colors.lightGrey };

    return (
      <View>
        <View style={[styles.notificationListContainer, markAsRead]}>
          <View style={styles.leftNotificationListWrapper}>
            <UserAvatar
              medium
              avatar={avatar}
              gender={gender}
              rounded={false}
              containerStyle={styles.avatar}
            />
          </View>
          <View style={styles.rightNotificationListWrapper}>
            <View style={styles.notificationContent}>
              <Text style={styles.heading}>{`${firstname} ${lastname}`}</Text>
              <Text>{' posted in '}</Text>
              <Text style={styles.heading}>{`${transformText.reduceByCharacters(
                title,
                20,
              )}: `}</Text>
              <Text
                style={styles.content}
              >{`"${transformText.reduceByCharacters(
                content,
                CHAR_LENGTH,
              )}"`}</Text>
            </View>
            <View>
              <Text style={styles.createdAt}>
                {transformDate.formatTimestamp(updated_at)}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

NotificationItem.propTypes = {
  sender: PropTypes.object,
  avatar: PropTypes.string,
  content: PropTypes.string,
  title: PropTypes.string,
  firstname: PropTypes.string,
  lastname: PropTypes.string,
  gender: PropTypes.string,
  updated_at: PropTypes.string,
  read: PropTypes.bool,
};

export default NotificationItem;
