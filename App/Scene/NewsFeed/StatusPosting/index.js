import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { StatusInput } from '~/Component';

import { graphql, gql, compose } from 'react-apollo';
import INSERT_NEWS_MUTATION from '~/Graphql/mutation/insertNews.graphql';
import { View, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

import styles from './styles';
import { Colors } from '~/Theme';
import { UserAvatar, TouchableView, Text } from '~/Component';

import { defaultUserAvatar } from '~/Scene/NewsFeed/fixture';

class StatusPosting extends Component {
  static propTypes = {
    insertNews: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      isVisibleModal: true,
    };

    this.post = this.post.bind(this);
    this.visibleModal = this.visibleModal.bind(this);
  }

  post(contentNews) {
    console.log(contentNews);
    this.props.insertNews({
      userId: 11, // bk user id
      conferenceId: 1, // fake conferences
      contentNews,
    });
  }

  visibleModal(isVisible) {
    this.setState({
      isVisibleModal: isVisible,
    });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.container}>
          <UserAvatar small avatar={defaultUserAvatar} />
          <TouchableView
            rippleColor={Colors.primary}
            style={styles.statusBoxView}
            // onPress={() => this.visibleModal(true)}
          >
            <Text style={[styles.placeholderStyle]}>
              {"What's on your mind?"}
            </Text>
          </TouchableView>
          <TouchableOpacity>
            <Icon name="camera" type="material-community" />
          </TouchableOpacity>
        </View>

        <StatusInput
          isVisible={this.state.isVisibleModal}
          post={this.post}
          cancel={this.visibleModal}
        />
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
