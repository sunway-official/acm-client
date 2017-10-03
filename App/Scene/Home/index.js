import React from 'react';
import PropTypes from 'prop-types';
import { View, Button } from 'react-native';
import { Text } from '~/Component';
import { connect } from 'react-redux';
import { addHeaderOptions } from '~/Redux/Toolbar/action';
import { Colors } from '~/Theme';
import styles from './styles';

const text = [
  'Welcome to acm!',
  'We are under developement.',
  'Shake your phone to open the developer menu.',
  'Press Menu button on the top left corner',
  'to connect to other scene.',
];

const HomeScene = ({ showSearch, hideSearch }) =>
  <View style={styles.container}>
    <View style={styles.centerText}>
      {text.map((text, index) =>
        <Text key={index}>
          {text}
        </Text>,
      )}
    </View>
    <Button title="Show search box" onPress={showSearch} />
    <View marginBottom={24} />
    <Button title="Hide search box" onPress={hideSearch} />
  </View>;

HomeScene.drawer = {
  primary: true,
};

HomeScene.header = {
  leftIcon: 'drawer',
  float: true,
  title: null,
  theme: 'dark',
  backgroundColor: Colors.blue,
  statusBarBackgroundColor: Colors.blue,
  actions: [
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
  showSearch: PropTypes.func,
  hideSearch: PropTypes.func,
};

const mapDispatchToProps = dispatch => ({
  showSearch: () =>
    dispatch(
      addHeaderOptions({
        search: {
          placeholder: 'Search something',
          enable: true,
        },
        leftIcon: 'back',
      }),
    ),
  hideSearch: () =>
    dispatch(
      addHeaderOptions({
        search: {},
        leftIcon: 'drawer',
      }),
    ),
});

export default connect(undefined, mapDispatchToProps)(HomeScene);
