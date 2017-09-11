import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { Colors } from '~/Theme';
import ProfileHeader from './Header';
import ProfileBody from './Body';
import styles from './styles';
import About from './Body/Content/About';

class ProfileScene extends Component {
  static header = {
    leftIcon: 'drawer',
    hideTitle: true,
    float: true,
    theme: 'dark',
    backgroundColor: 'rgba(0,0,0,0)',
    statusBarBackgroundColor: Colors.black,
    actions: [
      {
        icon: {},
        onPress: () => {
          console.log('hello there');
        },
      },
    ],
  };

  static footer = {
    show: true,
    activeColor: Colors.red,
  };

  static propTypes = {
    home: PropTypes.func,
  };

  render() {
    return (
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
      >
        <ProfileHeader
          avatar="https://www.1plusx.com/app/mu-plugins/all-in-one-seo-pack-pro/images/default-user-image.png"
          username="Dung Le"
          address="Duy Tan University"
        />
        <ProfileBody />
      </ScrollView>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  home: () => dispatch(NavigationActions.navigate({ routeName: 'home' })),
});

export default connect(undefined, mapDispatchToProps)(ProfileScene);
