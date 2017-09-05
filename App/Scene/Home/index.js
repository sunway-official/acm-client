import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';
import styles from './styles';

class HomeScene extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
        <Button title="Hit me" onPress={() => {}} />
      </View>
    );
  }
}

export default HomeScene;
