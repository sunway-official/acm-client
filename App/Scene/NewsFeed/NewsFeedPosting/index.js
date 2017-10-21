import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { graphql, gql, compose } from 'react-apollo';

import styles from './styles';
import { Icon } from 'react-native-elements';
import { Colors, Images } from '~/Theme';

import { View, TouchableOpacity } from 'react-native';
import {
  UserAvatar,
  TouchableView,
  Text,
  NewsFeedPosts,
  AnimatableView,
} from '~/Component';

import { KEY, setModalState } from '~/Redux/Modal';
import INSERT_NEWS_MUTATION from '~/Graphql/mutation/insertNews.graphql';
import ME_QUERY from '~/Graphql/query/me.graphql';

const defaultAvatar = Images.avatar['male08'];

class NewsFeedPosting extends Component {
  static propTypes = {
    insertNews: PropTypes.func,
    showNewsFeedPosting: PropTypes.func,
    hideNewsFeedPosting: PropTypes.func,
    modal: PropTypes.object,
    loading: PropTypes.bool,
    me: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.post = this.post.bind(this);
  }

  _renderPostFake() {
    return (
      <View style={styles.container}>
        <UserAvatar small avatar={defaultAvatar} />
        <TouchableView
          rippleColor={Colors.grey}
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
    // TODO: remove comment when publish app
    // console.log(this.props.me.id);
    // console.log(contentNews);
    this.props.insertNews({
      userId: this.props.me.id, // bk user id
      conferenceId: 1, // fake conferences
      contentNews,
    });
    // console.log('done');
  }

  render() {
    const { loading } = this.props;
    const isVisible = this.props.modal.isOpen;

    if (loading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <AnimatableView
            animation="rotate"
            duration={1000}
            iterationCount="infinite"
          >
            <Icon name="loop" />
          </AnimatableView>
        </View>
      );
    }

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

const MeQuery = graphql(gql(ME_QUERY), {
  props: ({ data: { loading, me } }) => ({
    loading,
    me,
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
  MeQuery,
)(NewsFeedPosting);
