import React, { Component } from 'react';
import { AsyncStorage, Keyboard } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavigationActions as ReactNavigationActions } from 'react-navigation';
// import { getInitialRoute } from '~/Navigation/resolver';
import { gql, graphql, compose, withApollo } from 'react-apollo';
import mutation from '~/Graphql/mutation/updatePassword.graphql';

import ChangePasswordForm from '../ChangePassword/Form';

class ChangePasswordScene extends Component {
  static propTypes = {
    mutate: PropTypes.func,
    client: PropTypes.any,
    navigateToLogin: PropTypes.func,
    client: PropTypes.any,
  };

  constructor(props) {
    super(props);

    this.state = {
      error: undefined,
      loading: false,
    };

    this._handleUpdate = this._handleUpdate.bind(this);
  }

  _canSave(values) {
    const { oldPassword, newPassword, confirmNewPassword } = values;

    if (oldPassword === newPassword) {
      this.setState({
        error: 'New password is the same with old once',
        loading: false,
      });
      return false;
    } else if (newPassword !== confirmNewPassword) {
      this.setState({
        error: 'Confirm password is not the same',
        loading: false,
      });
      return false;
    } else return true;
  }

  async _handleUpdate(values) {
    this.setState({ loading: true });
    Keyboard.dismiss();
    // console.log(AsyncStorage.getAllKeys());

    try {
      const { oldPassword, newPassword } = values;
      const isSave = await this._canSave(values);

      if (isSave) {
        await this.props.mutate({
          variables: { oldPassword, newPassword },
        });
        await AsyncStorage.clear();

        this.setState({
          loading: false,
        });
      }
    } catch ({ graphQLErrors }) {
      console.log({ graphQLErrors });
      const error = graphQLErrors[0];
      if (error.message === 'wrong-password') {
        this.setState({
          error: 'Wrong current password',
          loading: false,
        });
      }
    }
  }

  render() {
    return (
      <ChangePasswordForm
        loading={this.state.loading}
        loginError={this.state.error}
        onChangePassword={this._handleUpdate}
      />
    );
  }
}

const mapDispatchToProps = dispatch => ({
  navigateToLogin: () =>
    dispatch(NavigationActions.navigate({ routeName: 'login' })),
});

export default compose(
  connect(undefined, mapDispatchToProps),
  graphql(gql(mutation)),
  withApollo,
)(ChangePasswordScene);
