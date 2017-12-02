import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { AsyncStorage, Keyboard } from 'react-native';
import { NavigationActions } from '~/Redux/Navigation';
import LoginForm from '../Login/Form';
import { getInitialRoute } from '~/Navigation/resolver';
import { compose, gql, graphql, withApollo } from 'react-apollo';
import mutation from '~/Graphql/mutation/login.graphql';
import QUERY_ME from '~/Graphql/query/me.graphql';

class LoginScene extends Component {
  static propTypes = {
    navigateToForgotPassword: PropTypes.func,
    mutate: PropTypes.func,
    navigateToInitialScene: PropTypes.func,
    navigateToConferencesList: PropTypes.func,
    client: PropTypes.any,
  };

  static header = {
    disable: true,
    theme: 'light',
    statusBarBackgroundColor: 'rgba(0,0,0,0.3)',
  };

  static footer = {
    disable: true,
  };

  static drawer = {
    disableGestures: true,
  };

  constructor(props) {
    super(props);

    this._submit = this._submit.bind(this);
  }

  async _submit(values, setFieldError) {
    const { mutate } = this.props;

    Keyboard.dismiss();
    try {
      const { data: { login: { token, refreshToken } } } = await mutate({
        variables: values,
      });
      await AsyncStorage.multiSet([
        ['token', token],
        ['refreshToken', refreshToken],
      ]);
      await this.props.client.resetStore();
      // Refetch QUERY_ME for checking current conference
      await this.props.client.query({ query: gql(QUERY_ME) });
      // Navigate to initial route if there is no problems
      this.props.navigateToInitialScene();
    } catch ({ graphQLErrors }) {
      const error = graphQLErrors[0];
      if (error.message.includes('wrong-email-or-password')) {
        setFieldError('email', 'Wrong email or password!');
      } else if (error.message.includes('user-not-exists')) {
        setFieldError('email', 'User is not exist!');
      } else if (error.message.includes('no-current-conference')) {
        this.props.navigateToConferencesList();
      } else {
        setFieldError('email', 'Opps, somethings bad happened!');
      }
    }
  }

  componentWillUnmount() {
    Keyboard.dismiss();
  }

  render() {
    const { navigateToForgotPassword } = this.props;
    return (
      <LoginForm onLogin={this._submit} onNavigate={navigateToForgotPassword} />
    );
  }
}

const mapDispatchToProps = dispatch => ({
  navigateToForgotPassword: () =>
    dispatch(NavigationActions.navigate({ routeName: 'forgot' })),
  navigateToInitialScene: () =>
    dispatch(NavigationActions.reset({ routeName: getInitialRoute() })),
  navigateToConferencesList: () =>
    dispatch(NavigationActions.reset({ routeName: 'conferenceList' })),
});

export default compose(
  connect(undefined, mapDispatchToProps),
  graphql(gql(mutation)),
  withApollo,
)(LoginScene);
