import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import styles from './styles';
import { Icon } from 'react-native-elements';

import { View, TouchableOpacity } from 'react-native';
import { UserAvatar, TouchableView, Text } from 'Component';

import { NavigationActions } from 'Reduck/Navigation';

class NewsFeedFakePosting extends Component {
  static propTypes = {
    avatar: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    gender: PropTypes.string,
    userId: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    navigate: PropTypes.func,
    onRefresh: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this._handleNavigateToPosting = this._handleNavigateToPosting.bind(this);
  }

  _handleNavigateToPosting() {
    this.props.navigate('newsPosting');
  }

  _renderPostFake(avatar, gender) {
    return (
      <View style={styles.container}>
        <UserAvatar small avatar={avatar} gender={gender} />
        <TouchableView
          style={styles.statusBoxView}
          onPress={this._handleNavigateToPosting}
        >
          <Text style={[styles.placeholderStyle]}>
            {"What's on your mind?"}
          </Text>
        </TouchableView>
        <TouchableOpacity onPress={this._handleNavigateToPosting}>
          <Icon name="camera" type="material-community" />
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    const { avatar, gender } = this.props;
    return <View>{this._renderPostFake(avatar, gender)}</View>;
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
