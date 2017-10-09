import React from 'react';
import { View } from 'react-native';
import { Colors } from '~/Theme';
import { navigate } from '~/Redux/Navigation/action';
import List from './List';
import fixture from '../fixture';
import styles from './styles';

// import DatePicker from '~/Component/DatePicker';

const MyAgenda = () =>
  <View style={styles.container}>
    {/*<DatePicker date={new Date()} />*/}
    <List data={fixture} />
  </View>;

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
