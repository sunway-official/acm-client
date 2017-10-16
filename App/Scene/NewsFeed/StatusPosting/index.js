import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, TextInput } from 'react-native';
import { Icon } from 'react-native-elements';
import { UserAvatar, TouchableView, Text } from '~/Component';
import { Colors } from '~/Theme';
import { defaultUserAvatar } from '../fixture';
import styles from './styles';

import { graphql, gql, compose } from 'react-apollo';
import INSERT_NEWS_MUTATION from '~/Graphql/mutation/insertNews.graphql';

class StatusPosting extends Component {
  static propTypes = {
    insertNews: PropTypes.func,
  };

  post(contentNews) {
    this.props.insertNews({
      userId: 11, // bk user id
      conferenceId: 1, // fake conferences
      contentNews,
    });
  }

  render() {
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
        <TouchableView
          rippleColor={Colors.primary}
          onPress={() => this.post('this is new status')}
        >
          <Text>Post</Text>
        </TouchableView>
      </View>
    );
  }
}

const StatusPostingMutation = graphql(gql(INSERT_NEWS_MUTATION), {
  props: ({ mutate }) => ({
    insertNews: ({ userId, conferenceId, contentNews }) =>
      mutate({
        variables: { userId, conferenceId, contentNews },
      }),
  }),
});

export default compose(StatusPostingMutation)(StatusPosting);
