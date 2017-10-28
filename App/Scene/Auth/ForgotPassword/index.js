import React, { Component } from 'react';
import { Keyboard } from 'react-native';
import ForgotPasswordForm from './Form';

class ForgotPasswordScene extends Component {
  componentWillUnmount() {
    Keyboard.dismiss();
  }

  render() {
    return <ForgotPasswordForm />;
  }
}
ForgotPasswordScene.header = {
  disable: true,
  theme: 'light',
  float: true,
  statusBarBackgroundColor: 'rgba(0,0,0,0.3)',
};

ForgotPasswordScene.footer = {
  disable: true,
};

ForgotPasswordScene.drawer = {
  disableGestures: true,
};

export default ForgotPasswordScene;
