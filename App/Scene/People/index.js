import { Colors } from 'Theme';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Content from './Content';

class PeopleScene extends Component {
  static propTypes = {
    navigation: PropTypes.object,
  };

  render() {
    const { navigation } = this.props;

    return navigation && <Content userId={navigation.state.params.userId} />;
  }
}

PeopleScene.header = {
  leftIcon: 'back',
  hideTitle: true,
  // float: true,
  theme: 'dark',
  backgroundColor: Colors.primary,
  statusBarBackgroundColor: Colors.primary,
};

PeopleScene.propTypes = {
  home: PropTypes.func,
};

export default PeopleScene;
