import React from 'react';
import { View } from 'react-native';
import styles from '../styles';
import { Colors } from '~/Theme';
import { navigate } from '~/Redux/Navigation/action';

const MyAgenda = () => <View style={styles.container} />;

MyAgenda.header = {
  theme: 'dark',
  actions: [
    {
      icon: {
        name: 'calendar-range',
        type: 'material-community',
      },
      onPress: dispatch => dispatch(navigate({ routeName: 'agenda' })),
    },
  ],
};

MyAgenda.footer = {
  show: true,
  activeColor: Colors.primary,
};

export default MyAgenda;
