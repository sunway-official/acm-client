import React from 'react';
import PropTypes from 'prop-types';
import { View, Button } from 'react-native';
import { Text } from 'Component';
import { connect } from 'react-redux';
import { NavigationActions } from 'Reduck/Navigation';
import styles from './styles';
import { Colors } from 'Theme';

const text = ['Welcome to Notification!'];

const NotificationScene = ({ home }) => (
  <View style={styles.container}>
    <View style={styles.centerText}>
      {text.map((text, index) => <Text key={index}>{text}</Text>)}
    </View>
    <Button title="Home" color={Colors.purple} onPress={home} />
  </View>
);

NotificationScene.header = {
  leftIcon: 'drawer',
  theme: 'dark',
  backgroundColor: Colors.purple,
  statusBarBackgroundColor: Colors.purple,
};

// NotificationScene.footer = {
//   activeColor: Colors.purple,
//   show: true,
// };

NotificationScene.propTypes = {
  home: PropTypes.func,
};

const mapDispatchToProps = dispatch => ({
  home: () => dispatch(NavigationActions.navigate({ routeName: 'home' })),
});

export default connect(undefined, mapDispatchToProps)(NotificationScene);
