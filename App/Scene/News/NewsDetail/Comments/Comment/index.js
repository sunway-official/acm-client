import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Icon } from 'react-native-elements';

import { Text, UserAvatar } from 'Component';
import styles from './styles';

class Comment extends PureComponent {
  static propTypes = {
    comment: PropTypes.object,
    createdAt: PropTypes.string,
  };

  render() {
    const { comment, createdAt } = this.props;
    return (
      <View>
        <View style={styles.container}>
          <UserAvatar
            avatar={comment.user.avatar}
            gender={comment.user.gender}
          />
          <View style={styles.commentContainer}>
            <View style={styles.infoContainer}>
              <Text bold>
                {`${comment.user.firstname} ${comment.user.lastname}`}
              </Text>
              <Icon name="dot-single" type="entypo" color="grey" />
              <Text style={styles.textColor}>{createdAt}</Text>
            </View>
            <Text>{comment.content}</Text>
          </View>
        </View>
      </View>
    );
  }
}

export default Comment;
