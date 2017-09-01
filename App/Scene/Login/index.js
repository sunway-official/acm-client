import React, { Component } from 'react';
import { View } from 'react-native';
import styles from './styles';
import {
  FormInput,
  FormLabel,
  FormValidationMessage,
  Button,
} from 'react-native-elements';

class LoginScene extends Component {
  render() {
    return (
      <View style={styles.container}>
        <FormLabel>Email</FormLabel>
        <FormInput />
        <FormValidationMessage>This field is required.</FormValidationMessage>
        <FormLabel>Password</FormLabel>
        <FormInput />
        <FormValidationMessage>This field is required.</FormValidationMessage>
        <View style={{ marginTop: 10 }}>
          <Button title="Register" />
        </View>
      </View>
    );
  }
}

export default LoginScene;
