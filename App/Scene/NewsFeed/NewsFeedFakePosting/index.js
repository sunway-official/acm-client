import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import styles from './styles';
import { Icon } from 'react-native-elements';

import { View, TouchableOpacity } from 'react-native';
import { UserAvatar, TouchableView, Text } from '~/Component';

import { NavigationActions } from '~/Redux/Navigation';

class NewsFeedFakePosting extends Component {
  static propTypes = {
    avatar: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    userId: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    navigate: PropTypes.func,
    onRefresh: PropTypes.func,
  };

  constructor(props) {
    super(props);

    // this._renderPostFake = this._renderPostFake.bind();
    this._handleNavigateToNewsFeedPosting = this._handleNavigateToNewsFeedPosting.bind(
      this,
    );
  }

  _handleNavigateToNewsFeedPosting() {
    this.props.navigate('newsFeedPosting');
  }

  _renderPostFake(avatar) {
    return (
      <View style={styles.container}>
        <UserAvatar small avatar={avatar} />
        <TouchableView
          style={styles.statusBoxView}
          onPress={this._handleNavigateToNewsFeedPosting}
        >
          <Text style={[styles.placeholderStyle]}>
            {"What's on your mind?"}
          </Text>
        </TouchableView>
        <TouchableOpacity onPress={this._handleNavigateToNewsFeedPosting}>
          <Icon name="camera" type="material-community" />
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    const { avatar } = this.props;
    return <View>{this._renderPostFake(avatar)}</View>;
  }
}

const mapDispatchToProps = dispatch => ({
  navigate: routeName =>
    dispatch(
      NavigationActions.navigate({
        routeName,
      }),
    ),
});

export default connect(undefined, mapDispatchToProps)(NewsFeedFakePosting);
