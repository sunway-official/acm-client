import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Button } from 'react-native';
import { Text, UserProfileBody, UserProfileHeader } from 'Component';
import { connect } from 'react-redux';
import { NavigationActions } from 'Reduck/Navigation';
import styles from './styles';
import { Colors } from 'Theme';

class PeopleScene extends Component {
  static propTypes = {
    personalInfo: PropTypes.object,
  };

  render() {
    const { personalInfo } = this.props;
    return (
      <View>
        <UserProfileHeader user={personalInfo} />
        <UserProfileBody user={personalInfo} />
      </View>
    );
  }
}

PeopleScene.header = {
  leftIcon: 'drawer',
  theme: 'dark',
  backgroundColor: Colors.green,
  statusBarBackgroundColor: Colors.green,
  actions: [
    {
      icon: {},
      onPress: () => {
        console.log('hello people');
      },
    },
  ],
};

PeopleScene.propTypes = {
  home: PropTypes.func,
};

// const mapDispatchToProps = dispatch => ({});

export default connect(undefined, undefined)(PeopleScene);
