import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { graphql, gql, compose } from 'react-apollo';

import styles from './styles';
import { Icon } from 'react-native-elements';
import { Colors } from '~/Theme';

import { View, TouchableOpacity } from 'react-native';
import { UserAvatar, TouchableView, Text, NewsFeedPosts } from '~/Component';

import { KEY, setModalState } from '~/Redux/Modal';
import INSERT_NEWS_MUTATION from '~/Graphql/mutation/insertNews.graphql';

import { defaultUserAvatar } from '~/Scene/NewsFeed/fixture';

class NewsFeedPosting extends Component {
  static propTypes = {
    insertNews: PropTypes.func,
    showNewsFeedPosting: PropTypes.func,
    hideNewsFeedPosting: PropTypes.func,
    modal: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.post = this.post.bind(this);
  }

  _renderPostFake() {
    return (
      <View style={styles.container}>
        <UserAvatar small avatar={defaultUserAvatar} />
        <TouchableView
          rippleColor={Colors.primary}
          style={styles.statusBoxView}
          onPress={() => this.props.showNewsFeedPosting()}
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
    console.log('done');
  }

  render() {
    const isVisible = this.props.modal.isOpen;

    return (
      <View>
        {this._renderPostFake()}

        <NewsFeedPosts
          isVisible={isVisible}
          post={this.post}
          cancel={() => this.props.hideNewsFeedPosting()}
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

const mapStateToProps = state => ({
  modal: state[KEY],
});

const mapDispatchToProps = dispatch => ({
  showNewsFeedPosting: () => dispatch(setModalState(true)),
  hideNewsFeedPosting: () => dispatch(setModalState(false)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  NewsFeedPostingMutation,
)(NewsFeedPosting);
