import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import styles from './styles';
import { Icon } from 'react-native-elements';
import { Colors, Images } from '~/Theme';

import { View, TouchableOpacity } from 'react-native';
import { UserAvatar, TouchableView, Text, NewsFeedPosts } from '~/Component';

import { KEY, setModalState } from '~/Redux/Modal';

const defaultAvatar = Images.avatar['male08'];

class NewsFeedPosting extends Component {
  static propTypes = {
    showNewsFeedPosting: PropTypes.func,
    hideNewsFeedPosting: PropTypes.func,
    modal: PropTypes.object,
    avatar: PropTypes.string,
    userId: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    handlePost: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this._handleShowModal = this._handleShowModal.bind(this);
    this._handleHideModal = this._handleHideModal.bind(this);
  }

  _handleShowModal() {
    this.props.showNewsFeedPosting();
  }

  _handleHideModal() {
    this.props.hideNewsFeedPosting();
  }

  _renderPostFake(avatar) {
    return (
      <View style={styles.container}>
        <UserAvatar small avatar={avatar === null ? defaultAvatar : avatar} />
        <TouchableView
          rippleColor={Colors.grey}
          style={styles.statusBoxView}
          onPress={this._handleShowModal}
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

  render() {
    const { username, handlePost, avatar } = this.props;
    const isVisible = this.props.modal.isOpen;

    return (
      <View>
        {this._renderPostFake(avatar)}

        <NewsFeedPosts
          isVisible={isVisible}
          handlePost={handlePost}
          handleCancel={this._handleHideModal}
          username={username}
          avatar={avatar}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  modal: state[KEY],
});

const mapDispatchToProps = dispatch => ({
  showNewsFeedPosting: () => dispatch(setModalState(true)),
  hideNewsFeedPosting: () => dispatch(setModalState(false)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewsFeedPosting);
