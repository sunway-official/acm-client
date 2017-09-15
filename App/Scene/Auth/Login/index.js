import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavigationActions } from '~/Redux/Navigation';
import { KEY, setLoggedIn } from '~/Redux/Login';

import LoginForm from '../Login/Form';

submit = ({ values }, setLoggedIn) => {
  console.log(values);
  setLoggedIn();
};

const LoginScene = ({ navigateForgotPassword }) =>
  <LoginForm onLogin={submit} onNavigate={navigateForgotPassword} />;

LoginScene.propTypes = {
  login: PropTypes.object,
  setLoggedIn: PropTypes.func,
  navigateForgotPassword: PropTypes.func,
};

LoginScene.drawer = {
  primary: true,
};

const mapStateToProps = state => ({
  login: state[KEY],
});

const mapDispatchToProps = dispatch => ({
  setLoggedIn: bindActionCreators(setLoggedIn, dispatch),
  navigateForgotPassword: () =>
    dispatch(NavigationActions.navigate({ routeName: 'forgot' })),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScene);
