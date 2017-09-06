import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { KEY, setLoggedIn } from '../../Redux/Login';
import LoginForm from '../../Component/Login/LoginForm';

class LoginScene extends Component {
  static propTypes = {
    login: PropTypes.object,
    setLoggedIn: PropTypes.func,
    navigation: PropTypes.object,
  };

  submit = values => {
    console.log(values);
    this.props.setLoggedIn();
    console.log(this.props.navigation);
  };

  render() {
    return <LoginForm onSubmit={this.submit} />;
  }
}

const mapStateToProps = state => ({
  login: state[KEY],
});

const mapDispatchToProps = dispatch => {
  return {
    setLoggedIn: bindActionCreators(setLoggedIn, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScene);
