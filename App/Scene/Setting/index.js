import React from 'react';
import PropTypes from 'prop-types';
import { View, Button } from 'react-native';
import { Text } from 'Component';
import { connect } from 'react-redux';
import { NavigationActions } from 'Reduck/Navigation';
import styles from './styles';

const text = ['Welcome to Setting Scene!'];

const SettingScene = ({ home }) => (
  <View style={styles.container}>
    <View style={styles.centerText}>
      {text.map((text, index) => <Text key={index}>{text}</Text>)}
    </View>
    <Button title="Home" onPress={home} />
  </View>
);

SettingScene.drawer = {
  secondary: true,
};

SettingScene.header = {
  leftIcon: 'drawer',
};

SettingScene.propTypes = {
  home: PropTypes.func,
};

const mapDispatchToProps = dispatch => ({
  home: () => dispatch(NavigationActions.navigate({ routeName: 'home' })),
});

export default connect(undefined, mapDispatchToProps)(SettingScene);
