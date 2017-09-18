import React from 'react';
import PropTypes from 'prop-types';
import { View, Button } from 'react-native';
import { Text } from '~/Component';
import { connect } from 'react-redux';
import { NavigationActions } from '~/Redux/Navigation';
import { Colors } from '~/Theme';
import styles from './styles';

const text = [
  'Welcome to cem-client!',
  'We are under developement.',
  'Shake your phone to open the developer menu.',
  'Press Menu button on the top left corner',
  'to connect to other scene.',
];

const HomeScene = ({ login }) =>
  <View style={styles.container}>
    <View style={styles.centerText}>
      {text.map((text, index) =>
        <Text key={index}>
          {text}
        </Text>,
      )}
    </View>
    <Button title="Login" onPress={login} />
  </View>;

HomeScene.drawer = {
  primary: true,
};

HomeScene.header = {
  leftIcon: 'drawer',
  float: true,
  title: null,
  search: {
    value: '',
    placeholder: 'Search something',
    enable: true,
  },
  theme: 'light',
  backgroundColor: 'rgba(0,0,0,0)',
  statusBarBackgroundColor: 'rgba(0,0,0,0.5)',
  actions: [
    {
      icon: {},
      onPress: dispatch => {
        console.log('hello there');
        dispatch({
          type: 'REDUX_ACTION',
          payload: "Hello! I'm here",
        });
      },
    },
    {
      icon: {
        name: 'lock',
      },
      onPress: dispatch => {
        dispatch({
          type: 'LOCK_ACTION',
          payload: 'Lock the account',
        });
      },
    },
  ],
};

HomeScene.propTypes = {
  login: PropTypes.func,
};

const mapDispatchToProps = dispatch => ({
  login: () => dispatch(NavigationActions.navigate({ routeName: 'login' })),
});

export default connect(undefined, mapDispatchToProps)(HomeScene);
