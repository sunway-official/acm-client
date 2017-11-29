import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose, gql, graphql } from 'react-apollo';
import { View } from 'react-native';
import moment from 'moment';
import { connect } from 'react-redux';
import { NavigationActions } from '~/Redux/Navigation';
import { Text } from '~/Component';
import styles from './styles';

import NewsHeader from './Header.js';
import NewsInteractionBar from './InteractionBar.js';
import NewsPhotoView from './PhotoView.js';

import MUTATION_INSERT_NEWS_LIKE from '~/Graphql/mutation/insertNewsLike.graphql';
import MUTATION_DELETE_NEWS_LIKE from '~/Graphql/mutation/deleteNewsLike.graphql';

const formatCreatedAt = createdAt =>
  moment(createdAt).calendar(null, {
    sameDay: '[Today]',
    nextDay: '[Tomorrow]',
    nextWeek: 'dddd',
    lastDay: '[Yesterday]',
    lastWeek: 'dddd',
    sameElse: 'DD/MM/YYYY',
  });

class News extends Component {
  static propTypes = {
    item: PropTypes.object,
    newsContainerStyle: PropTypes.object,
    userId: PropTypes.string,
    newsLikeById: PropTypes.object,
    insertNewsLike: PropTypes.func,
    deleteNewsLike: PropTypes.func,
    avatar: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    navigate: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      isLiked: false,
      isDisabledLike: false,
      numberOfLikes: 0,
      numberOfComments: 0,
    };

    this.onPressComment = this.onPressComment.bind(this);
    this.onPressLike = this.onPressLike.bind(this);
  }

  componentWillReceiveProps({ item }) {
    if (item) {
      this.setState({
        isLiked: item.isLiked,
        numberOfLikes: item.likesCount,
        numberOfComments: item.commentsCount,
      });
    }
  }

  componentDidMount() {
    const { item } = this.props;
    this.setState({
      isLiked: item.isLiked,
      numberOfLikes: item.likesCount,
      numberOfComments: item.commentsCount,
    });
  }

  _renderNewsHeader(item, createdAt) {
    let username = `${item.user.firstname} ${item.user.lastname}`;
    let avatar = item.user.avatar;

    return (
      <NewsHeader avatar={avatar} username={username} createdAt={createdAt} />
    );
  }

  _renderPhotoView(imageUrl) {
    return <NewsPhotoView imageUrl={imageUrl} />;
  }

  _renderStatus(item) {
    const url = item.newsPhotos.map(newsPhoto => newsPhoto.url);

    return (
      <View>
        {item.content ? <Text>{item.content}</Text> : undefined}
        {this._renderPhotoView(url)}
      </View>
    );
  }

  _renderInteractionBar() {
    const {
      isLiked,
      isDisabledLike,
      numberOfComments,
      numberOfLikes,
    } = this.state;
    return (
      <NewsInteractionBar
        isLiked={isLiked}
        numberOfLikes={numberOfLikes}
        isDisabledLike={isDisabledLike}
        numberOfComments={numberOfComments}
        onPressLike={this.onPressLike}
        onPressComment={this.onPressComment}
      />
    );
  }

  onPressComment() {
    this.props.navigate({
      routeName: 'newsDetail',
      params: { ...this.props.item },
    });
  }

  async onPressLike() {
    this.setState({ isDisabledLike: true });
    if (this.state.isLiked === false) {
      this.setState({
        numberOfLikes: this.state.numberOfLikes + 1,
        isLiked: true,
      });

      const { data: { insertNewsLike } } = await this.props.insertNewsLike({
        news_id: this.props.item.id,
      });
      this.setState({ like: insertNewsLike });
    } else {
      this.setState({
        numberOfLikes: this.state.numberOfLikes - 1,
        isLiked: false,
      });
      await this.props.deleteNewsLike({
        news_id: this.props.item.id,
      });
    }
    this.setState({ isDisabledLike: false });
  }

  render() {
    const { item, newsContainerStyle } = this.props;
    let createdAt = formatCreatedAt(item.updated_at);

    return (
      <View style={[styles.container, newsContainerStyle]}>
        {this._renderNewsHeader(item, createdAt)}
        <View>
          {this._renderStatus(item)}
          {this._renderInteractionBar()}
        </View>
      </View>
    );
  }
}

const InsertNewsLikeWithMutation = graphql(gql(MUTATION_INSERT_NEWS_LIKE), {
  props: ({ mutate }) => ({
    insertNewsLike: ({ news_id }) =>
      mutate({
        variables: { news_id },
      }),
  }),
});

const DeleteNewsLikeWithMutation = graphql(gql(MUTATION_DELETE_NEWS_LIKE), {
  props: ({ mutate }) => ({
    deleteNewsLike: ({ news_id }) =>
      mutate({
        variables: { news_id },
      }),
  }),
});

const mapDispatchToProps = dispatch => ({
  navigate: options => dispatch(NavigationActions.navigate(options)),
});

export default compose(
  InsertNewsLikeWithMutation,
  DeleteNewsLikeWithMutation,
  connect(undefined, mapDispatchToProps),
)(News);
