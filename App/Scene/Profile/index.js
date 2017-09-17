import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { Colors } from '~/Theme';
import ProfileHeader from './Header';
import ProfileBody from './Body';
import { defaultUserAvatar } from './fixture';

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
        icon: {
          name: 'lead-pencil',
          type: 'material-community',
        },
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

  render() {
    return (
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
      >
        <ProfileHeader
          avatar={defaultUserAvatar}
          username="Dung Le"
          address="Duy Tan University"
        />
        <ProfileBody />
      </ScrollView>
    );
  }
}

export default ProfileScene;
