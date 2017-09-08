import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Text } from '~/Component';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { Colors } from '~/Theme';
import ProfileHeader from './Header';
import ProfileBody from './Body';
import styles from './styles';

class ProfileScene extends Component {
  static header = {
    leftIcon: 'drawer',
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
      <View style={styles.container}>
        <ProfileHeader
          avatar="https://www.1plusx.com/app/mu-plugins/all-in-one-seo-pack-pro/images/default-user-image.png"
          username="Dung Le"
          address="Duy Tan University"
        />
        <ProfileBody />
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  home: () => dispatch(NavigationActions.navigate({ routeName: 'home' })),
});

export default connect(undefined, mapDispatchToProps)(ProfileScene);
