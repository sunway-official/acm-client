import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavigationActions as ReactNavigationActions } from 'react-navigation';
import { getInitialRoute } from '~/Navigation/resolver';
import { compose, gql, graphql, withApollo } from 'react-apollo';
import mutation from '~/Graphql/mutation/login.graphql';

import ChangePasswordForm from '../ChangePassword/Form';

class ChangePasswordScene extends Component {
  _submit() {
    console.log('this is update');
  }

  render() {
    return <ChangePasswordForm onChangePassword={this._submit} />;
  }
}

export default ChangePasswordScene;
