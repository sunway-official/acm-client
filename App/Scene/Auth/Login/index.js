import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { AsyncStorage, Keyboard } from 'react-native';
import { Notifications } from 'expo';
import { NavigationActions } from 'Reduck/Navigation';
import LoginForm from '../Login/Form';
import { getInitialRoute } from 'Navigation/resolver';
import { compose, gql, graphql, withApollo } from 'react-apollo';
import MUTATION_LOGIN from 'Graphql/mutation/login.graphql';
import QUERY_ME from 'Graphql/query/me.graphql';
import MUTATION_UPDATE_NOTIFICATION_TOKEN from 'Graphql/mutation/updateNotificationToken.graphql';

class LoginScene extends Component {
  static propTypes = {
    navigateToForgotPassword: PropTypes.func,
    navigateToRegister: PropTypes.func,
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

      // Refetch QUERY_ME for checking current conference
      await this.props.client.query({ query: gql(QUERY_ME) });
      // Update user push notification token
      const key = await Notifications.getExpoPushTokenAsync();
      await this.props.client.mutate({
        mutation: gql(MUTATION_UPDATE_NOTIFICATION_TOKEN),
        variables: { key },
      });
      // Navigate to initial route if there is no problems
      this.props.navigateToInitialScene();
    } catch ({ graphQLErrors }) {
      const error = graphQLErrors[0];
      if (error.message.includes('wrong-email-or-password')) {
        this.setState({
          error: 'Wrong email or password.',
          loading: false,
        });
      } else if (error.message.includes('user-not-exists')) {
        this.setState({
          error: 'User is not exists',
          loading: false,
        });
      } else if (error.message.includes('no-current-conference')) {
        this.props.navigateToConferencesList();
      }
    }
  }

  componentWillUnmount() {
    Keyboard.dismiss();
  }

  render() {
    const { navigateToForgotPassword, navigateToRegister } = this.props;
    return (
      <LoginForm
        loading={this.state.loading}
        loginError={this.state.error}
        onLogin={this._submit}
        onNavigateToForgotPassword={navigateToForgotPassword}
        onNavigateToRegister={navigateToRegister}
      />
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
  navigateToRegister: () =>
    dispatch(NavigationActions.navigate({ routeName: 'register' })),
});

export default compose(
  connect(undefined, mapDispatchToProps),
  graphql(gql(MUTATION_LOGIN)),
  withApollo,
)(LoginScene);
