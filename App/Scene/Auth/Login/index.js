import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { AsyncStorage, Keyboard } from 'react-native';
import { NavigationActions } from '~/Redux/Navigation';
import { NavigationActions as ReactNavigationActions } from 'react-navigation';
import LoginForm from '../Login/Form';
import { compose, gql, graphql, withApollo } from 'react-apollo';
import mutation from '~/Graphql/mutation/login.graphql';

class LoginScene extends Component {
  static propTypes = {
    navigateToForgotPassword: PropTypes.func,
    mutate: PropTypes.func,
    navigateToHome: PropTypes.func,
    client: PropTypes.any,
  };

  static drawer = {
    primary: true,
  };

  static header = {
    disable: true,
    theme: 'light',
    float: true,
    statusBarBackgroundColor: 'rgba(0,0,0,0.3)',
  };

  static footer = {
    disable: true,
  };

  constructor(props) {
    super(props);

    this.state = {
      error: undefined,
      loading: false,
    };

    this._submit = this._submit.bind(this);
  }

  async _submit(values) {
    const { mutate } = this.props;

    this.setState({ loading: true });
    Keyboard.dismiss();
    try {
      const { data: { login: { token, refreshToken } } } = await mutate({
        variables: values,
      });
      await AsyncStorage.multiSet([
        ['token', token],
        ['refreshToken', refreshToken],
      ]);
      this.props.client.resetStore();
      this.props.navigateToHome();
    } catch ({ graphQLErrors }) {
      const error = graphQLErrors[0];
      if (error.message === 'bad-credentials') {
        this.setState({
          error: 'Incorrect credentials.',
          loading: false,
        });
      }
    }
  }

  render() {
    const { navigateToForgotPassword } = this.props;
    return (
      <LoginForm
        loading={this.state.loading}
        loginError={this.state.error}
        onLogin={this._submit}
        onNavigate={navigateToForgotPassword}
      />
    );
  }
}

const mapDispatchToProps = dispatch => ({
  navigateToForgotPassword: () =>
    dispatch(NavigationActions.navigate({ routeName: 'forgot' })),
  navigateToHome: () =>
    dispatch(
      NavigationActions.reset({
        index: 0,
        actions: [ReactNavigationActions.navigate({ routeName: 'home' })],
      }),
    ),
});

export default compose(
  connect(undefined, mapDispatchToProps),
  graphql(gql(mutation)),
  withApollo,
)(LoginScene);
