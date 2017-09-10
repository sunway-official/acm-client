import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import ForgotPasswordForm from './Form';

class ForgotPasswordScene extends PureComponent {
  static propTypes = {};

  static header = {
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
  render() {
    return <ForgotPasswordForm />;
  }
}

export default ForgotPasswordScene;
