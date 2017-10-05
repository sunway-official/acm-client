import React from 'react';
import ForgotPasswordForm from './Form';

const ForgotPasswordScene = () => <ForgotPasswordForm />;

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
