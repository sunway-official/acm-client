import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { KEY, setModalState } from '~/Redux/Modal';

import { graphql, gql, compose } from 'react-apollo';
import INSERT_NEWS_MUTATION from '~/Graphql/mutation/insertNews.graphql';
import { View, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

import styles from './styles';
import { Colors } from '~/Theme';
import { UserAvatar, TouchableView, Text, NewsFeedPosts } from '~/Component';

import { defaultUserAvatar } from '~/Scene/NewsFeed/fixture';

class NewsFeedPosting extends Component {
  static propTypes = {
    insertNews: PropTypes.func,
    // showNewsFeedPosting: PropTypes.func,
    // hideNewsFeedPosting: PropTypes.func,
    // modal: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.state = {
      isVisibleModal: true,
    };

    this.post = this.post.bind(this);
    this.visibleModal = this.visibleModal.bind(this);
  }

  _renderPostFake() {
    return (
      <View style={styles.container}>
        <UserAvatar small avatar={defaultUserAvatar} />
        <TouchableView
          rippleColor={Colors.primary}
          style={styles.statusBoxView}
          // onPress={() => this.props.showNewsFeedPosting()}
        >
          <Text style={[styles.placeholderStyle]}>
            {"What's on your mind?"}
          </Text>
        </TouchableView>
        <TouchableOpacity>
          <Icon name="camera" type="material-community" />
        </TouchableOpacity>
      </View>
    );
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
    // const isVisible = this.props.modal.isOpen;
    return (
      <View style={{ flex: 1 }}>
        {this._renderPostFake()}

        <NewsFeedPosts
          isVisible={isVisible}
          post={this.post}
          // cancel={() => this.visibleModal}
        />
      </View>
    );
  }
}

const NewsFeedPostingMutation = graphql(gql(INSERT_NEWS_MUTATION), {
  props: ({ mutate }) => ({
    insertNews: ({ userId, conferenceId, contentNews }) =>
      mutate({
        variables: { userId, conferenceId, contentNews },
      }),
  }),
});

export default compose(NewsFeedPostingMutation)(NewsFeedPosting);
