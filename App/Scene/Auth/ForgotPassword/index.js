import React from 'react';
import PropTypes from 'prop-types';

import ForgotPasswordForm from './Form';

const ForgotPasswordScene = () => <ForgotPasswordForm />;

ForgotPasswordScene.header = {
  leftIcon: 'back',
  actions: [
    {
      icon: {
        name: 'lock',
      },
      onPress: () => {},
    },
  ],
};

export default ForgotPasswordScene;
