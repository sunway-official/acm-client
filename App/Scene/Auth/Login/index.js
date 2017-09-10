import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';
import { KEY, setLoggedIn } from '~/Redux/Login';

import LoginForm from '../Login/Form';

class LoginScene extends PureComponent {
  static propTypes = {
    login: PropTypes.object,
    setLoggedIn: PropTypes.func,
    navigateForgotPassword: PropTypes.func,
  };

  static drawer = {
    primary: true,
  };

  submit = values => {
    console.log(values);
    this.props.setLoggedIn();
  };

  render() {
    return (
      <LoginForm
        onLogin={this.submit}
        onNavigate={this.props.navigateForgotPassword}
      />
    );
  }
}

const mapStateToProps = state => ({
  login: state[KEY],
});

const mapDispatchToProps = dispatch => ({
  setLoggedIn: bindActionCreators(setLoggedIn, dispatch),
  navigateForgotPassword: () =>
    dispatch(NavigationActions.navigate({ routeName: 'forgot' })),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScene);
