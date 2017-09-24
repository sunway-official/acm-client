import React from 'react';
import Detail from '../Detail/MyAgenda';
import { Colors } from '~/Theme';
import { navigate } from '~/Redux/Navigation/action';

const MyAgenda = () => <Detail />;

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
