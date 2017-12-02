import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { gql, graphql, compose } from 'react-apollo';
import { Keyboard, KeyboardAvoidingView } from 'react-native';
import { ImagePicker } from 'expo';
import { AutoExpandingTextInput } from '~/Component';
import { NavigationActions } from '~/Redux/Navigation';
import { S3 } from '~/Provider';

import PostsHeader from './Header';
import PostContent from './Content';
import PostActions from './Actions';

import QUERY_ME from '~/Graphql/query/me.graphql';
import QUERY_ALL_NEWS from '~/Graphql/query/getAllNews.graphql';
import MUTATION_INSERT_NEWS from '~/Graphql/mutation/insertNews.graphql';
import MUTATION_INSERT_NEWS_PHOTO from '~/Graphql/mutation/insertNewsPhoto.graphql';
import styles from './styles';

const IMAGE_PICKER_CONFIG = {
  allowsEditing: true,
  aspect: [4, 3],
  base64: true,
};

class NewsPosting extends Component {
  static propTypes = {
    navigate: PropTypes.func,
    back: PropTypes.func,
    insertNews: PropTypes.func,
    insertNewsPhoto: PropTypes.func,
    avatar: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    username: PropTypes.string,
    me: PropTypes.object,
  };

  static header = {
    disable: true,
  };

  static footer = {
    disable: true,
  };

  constructor(props) {
    super(props);

    this.state = {
      text: '',
      images: [],
    };

    this._handlePost = this._handlePost.bind(this);
    this._handlePostMutation = this._handlePostMutation.bind(this);
    this._handleCancel = this._handleCancel.bind(this);
    this._handlePickImage = this._handlePickImage.bind(this);
    this._handleCaptureImage = this._handleCaptureImage.bind(this);
  }

  componentWillUnmount() {
    Keyboard.dismiss();
    this.setState({ text: '', images: [] });
  }

  _handlePostNews(content) {
    let contentTrim = content.trim();
    return this.props.insertNews({
      content: contentTrim,
    });
  }

  async _handlePostPhoto(photo, newsId) {
    const { uri, base64 } = photo;
    const { Key } = await S3.putAsync({ uri, base64 });

    // TODO: fill name for news photo
    await this.props.insertNewsPhoto({
      news_id: newsId,
      name: 'this is only image for test',
      url: Key,
    });
  }

  async _handlePostMutation(contentNews, newsPhotos) {
    const newNews = await this._handlePostNews(contentNews);

    if (newsPhotos) {
      await newsPhotos.map(photo =>
        this._handlePostPhoto(photo, newNews.data.insertNews.id),
      );
    }
  }

  async _handlePost() {
    const { text, images } = this.state;
    await this._handlePostMutation(text, images);
    this._handleCancel();
  }

  _handleCancel() {
    this.props.back('newsFeed');
  }

  _pushImagesToArray(result) {
    imageTemp = this.state.images;
    imageTemp.push(result);
    this.setState({ images: imageTemp });
  }

  async _handlePickImage() {
    let result = await ImagePicker.launchImageLibraryAsync(IMAGE_PICKER_CONFIG);
    if (!result.cancelled) {
      await this._pushImagesToArray(result);
    }
  }

  async _handleCaptureImage() {
    let result = await ImagePicker.launchCameraAsync(IMAGE_PICKER_CONFIG);
    if (!result.cancelled) {
      await this._pushImagesToArray(result);
    }
  }

  _renderHeader() {
    const { text, images } = this.state;
    let isDisabled = text === '' && images.length === 0;

    return (
      <PostsHeader
        onPressCancel={this._handleCancel}
        onPressPost={this._handlePost}
        isDisabled={isDisabled}
      />
    );
  }

  _renderContents({
    avatar,
    gender,
    firstname,
    lastname,
    position,
    organization,
  }) {
    let { text, images } = this.state;

    const username = `${firstname} ${lastname}`;
    return (
      <PostContent
        username={username}
        avatar={avatar}
        gender={gender}
        images={images}
        position={position}
        organization={organization}
      >
        <AutoExpandingTextInput
          value={text}
          placeholder={"What's on your mind?"}
          onChangeText={text => this.setState({ text })}
          enablesReturnKeyAutomatically={true}
          returnKeyType="done"
          style={styles.textInput}
        />
      </PostContent>
    );
  }

  _renderActions() {
    return (
      <PostActions
        onPressUploadImage={this._handlePickImage}
        onPressCaptureImage={this._handleCaptureImage}
      />
    );
  }

  render() {
    const { me } = this.props;

    return (
      <KeyboardAvoidingView behavior={'padding'} style={styles.container}>
        {this._renderHeader()}
        {this._renderContents(me)}
        {this._renderActions()}
      </KeyboardAvoidingView>
    );
  }
}

const MeQuery = graphql(gql(QUERY_ME), {
  props: ({ data: { loading, me } }) => ({
    loading,
    me,
  }),
});

const NewsPostingMutation = graphql(gql(MUTATION_INSERT_NEWS), {
  props: ({ mutate }) => ({
    insertNews: ({ content }) =>
      mutate({
        variables: { content },
      }),
  }),
});

const NewsPostingPhotoMutation = graphql(gql(MUTATION_INSERT_NEWS_PHOTO), {
  props: ({ mutate }) => ({
    insertNewsPhoto: ({ news_id, name, url }) =>
      mutate({
        variables: { news_id, name, url },
        refetchQueries: [
          {
            query: gql(QUERY_ALL_NEWS),
          },
        ],
      }),
  }),
});

const mapDispatchToProps = dispatch => ({
  navigate: routeName =>
    dispatch(
      NavigationActions.navigate({
        routeName,
      }),
    ),
  back: routeName =>
    dispatch(
      NavigationActions.back({
        routeName,
      }),
    ),
});

export default compose(
  MeQuery,
  NewsPostingMutation,
  NewsPostingPhotoMutation,
  connect(undefined, mapDispatchToProps),
)(NewsPosting);
