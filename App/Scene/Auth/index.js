import React from 'react';
import { Text, View } from 'react-native';
import styles from './styles';

import LoginForm from '../../Component/LoginForm';

export default class App extends React.Component {
  submit = values => {
    console.log(values);
  };

  render() {
    return <LoginForm onClick={this.submit} />;
  }
}
