import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ImageBackground, View, TouchableOpacity } from 'react-native';
// import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
// import { LinearGradient } from 'expo';
import { Text, LoadingIndicator, UserAvatar } from 'Component';
// import { randomBackground } from './fixtures';
import { transformText, transformDate } from 'Transformer';
import { gql, compose, graphql } from 'react-apollo';
// import { getInitialRoute } from 'Navigation/resolver';
// import { NavigationActions } from 'Reduck/Navigation';
import { Colors, Metrics } from 'Theme';

import styles from './styles';

const CHAR_LENGTH = 45;

class NotificationItem extends Component {
  render() {
    const { avatar, content, title, username, createdAt, read } = this.props;

    let markAsRead = read ? { backgroundColor: Colors.lightGrey } : null;

    return (
      <View>
        <View style={[styles.notificationListContainer, markAsRead]}>
          <View style={styles.leftNotificationListContainer}>
            <UserAvatar
              medium
              avatar={avatar}
              // gender={gender}
              rounded={false}
              containerStyle={styles.avatar}
            />
          </View>
          <View style={styles.rightNotificationListContainer}>
            <View style={styles.notificationContent}>
              <Text style={styles.heading}>{username}</Text>
              <Text>{' posted in '}</Text>
              <Text style={styles.heading}>{`${title}: `}</Text>
              <Text
                style={styles.content}
              >{`"${transformText.reduceByCharacters(
                content,
                CHAR_LENGTH,
              )}"`}</Text>
            </View>
            <View>
              <Text style={styles.createdAt}>
                {transformDate.formatTimestamp(createdAt)}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

NotificationItem.propTypes = {
  avatar: PropTypes.string,
  content: PropTypes.string,
  title: PropTypes.string,
  username: PropTypes.string,
  createdAt: PropTypes.string,
  read: PropTypes.bool,
};

const mapDispatchToProps = dispatch => ({});

export default compose(
  // graphql(gql(QUERY_ME)),
  // graphql(gql(SWITCH_CURRENT_CONFERENCE), {
  //   name: 'switchConference',
  // }),
  connect(undefined, mapDispatchToProps),
)(NotificationItem);
