import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { gql, graphql, compose } from 'react-apollo';
import { View } from 'react-native';
import { ImagePicker } from 'expo';
import { AutoExpandingTextInput } from '~/Component';
import { NavigationActions } from '~/Redux/Navigation';
import { S3 } from '~/Provider';

import PostsHeader from './Header';
import PostContent from './Content';
import PostActions from './Actions';

import MUTATION_INSERT_NEWS from '~/Graphql/mutation/insertNews.graphql';
import MUTATION_INSERT_NEWS_PHOTO from '~/Graphql/mutation/insertNewsPhoto.graphql';

const ImagePickerConfig = {
  allowsEditing: true,
  aspect: [4, 3],
  base64: true,
};

class NewsFeedPosting extends Component {
  static propTypes = {
    navigate: PropTypes.func,
    insertNews: PropTypes.func,
    insertNewsPhoto: PropTypes.func,
  };

  static header = {
    disable: true,
    theme: 'light',
    float: true,
    statusBarBackgroundColor: 'rgba(0,0,0,0.3)',
  };

  static footer = {
    disable: true,
  };

  static drawer = {
    // disableGestures: true,
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

  _handlePostNews(content) {
    return this.props.insertNews({
      // userId: this.props.me.id,
      conferenceId: 1,
      contentNews: content,
    });
  }

  async _handlePostPhoto(photo, newsId) {
    const { uri, base64 } = photo;
    const { Key } = await S3.putAsync({ uri, base64 });
    console.log('key ', Key);

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

    await this._onRefresh();
  }

  async _handlePost() {
    const { text, images } = this.state;
    await this._handlePostMutation(text, images);
    this._handleCancel();
  }

  _handleCancel() {
    this.setState({ text: '', images: [] });
    this.props.navigate('newsFeed');
  }

  _pushImagesToArray(result) {
    imageTemp = this.state.images;
    imageTemp.push(result);
    this.setState({ images: imageTemp });
  }

  async _handlePickImage() {
    let result = await ImagePicker.launchImageLibraryAsync(ImagePickerConfig);
    if (!result.cancelled) {
      await this._pushImagesToArray(result);
    }
  }

  async _handleCaptureImage() {
    let result = await ImagePicker.launchCameraAsync(ImagePickerConfig);
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

  _renderContents(username, avatar) {
    let { text, images } = this.state;

    return (
      <PostContent username={username} avatar={avatar} images={images}>
        <AutoExpandingTextInput
          value={text}
          placeholder={"What's on your mind?"}
          onChangeText={text => this.setState({ text })}
          enablesReturnKeyAutomatically={true}
          returnKeyType="done"
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
    const username = 'Tester';
    const avatar = 25;

    return (
      <View
        style={{
          flex: 1,
          marginTop: 22,
        }}
      >
        {this._renderHeader()}
        {this._renderContents(username, avatar)}
        {this._renderActions()}
      </View>
    );
  }
}

const NewsFeedFakePostingMutation = graphql(gql(MUTATION_INSERT_NEWS), {
  props: ({ mutate }) => ({
    insertNews: ({ userId, conferenceId, contentNews }) =>
      mutate({
        variables: { userId, conferenceId, contentNews },
        // update: (store, { data: { insertNews } }) => {
        //   const data = store.readQuery({
        //     query: gql(QUERY_ALL_NEWS),
        //     variables: {
        //       id: insertNews.id,
        //     },
        //   });

        //   if (isDuplicateNews(insertNews, data.getAllNews)) {
        //     return data;
        //   }

        //   store.writeQuery({
        //     query: gql(QUERY_ALL_NEWS),
        //     variables: {
        //       id: insertNews.id,
        //     },
        //     data,
        //   });
        // },
      }),
  }),
});

const NewsFeedFakePostingPhotoMutation = graphql(
  gql(MUTATION_INSERT_NEWS_PHOTO),
  {
    props: ({ mutate }) => ({
      insertNewsPhoto: ({ news_id, name, url }) =>
        mutate({
          variables: { news_id, name, url },
        }),
    }),
  },
);

const mapDispatchToProps = dispatch => ({
  navigate: routeName =>
    dispatch(
      NavigationActions.navigate({
        routeName,
      }),
    ),
});

export default compose(
  NewsFeedFakePostingMutation,
  NewsFeedFakePostingPhotoMutation,
  connect(undefined, mapDispatchToProps),
)(NewsFeedPosting);
