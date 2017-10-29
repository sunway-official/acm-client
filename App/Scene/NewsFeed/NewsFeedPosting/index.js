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
    userId: PropTypes.string,
    username: PropTypes.string,
    post: PropTypes.func,
  };

  constructor(props) {
    super(props);
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

  render() {
    const { username, post } = this.props;
    const isVisible = this.props.modal.isOpen;

    return (
      <View>
        {this._renderPostFake()}

        <NewsFeedPosts
          isVisible={isVisible}
          post={post}
          cancel={() => this.props.hideNewsFeedPosting()}
          username={username}
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
