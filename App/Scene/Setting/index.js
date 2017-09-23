import React from 'react';
import PropTypes from 'prop-types';
import { View, Button } from 'react-native';
import { Text } from '~/Component';
import { connect } from 'react-redux';
import { NavigationActions } from '~/Redux/Navigation';
import styles from './styles';

const text = ['Welcome to Setting Scene!'];

const SettingScene = ({ login }) =>
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

SettingScene.drawer = {
  secondary: true,
};

SettingScene.header = {
  leftIcon: 'drawer',
  actions: [
    {
      icon: {},
      onPress: () => {
        console.log('hello there');
      },
    },
  ],
};

SettingScene.propTypes = {
  login: PropTypes.func,
};

const mapDispatchToProps = dispatch => ({
  login: () => dispatch(NavigationActions.navigate({ routeName: 'login' })),
});

export default connect(undefined, mapDispatchToProps)(SettingScene);
