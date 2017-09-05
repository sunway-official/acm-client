import React, { Component } from 'react';

import LoginForm from '../../Component/Login/LoginForm';

class LoginScene extends Component {
  submit = values => {
    console.log(values);
  };

  render() {
    return <LoginForm onSubmit={this.submit} />;
  }
}

export default LoginScene;
