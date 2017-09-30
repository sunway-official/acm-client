import React, { Component } from 'react';
import { AsyncStorage, Keyboard, View } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavigationActions } from '~/Redux/Navigation';
import { gql, graphql, compose } from 'react-apollo';

import { Metrics } from '~/Theme';
import { KEY, setModalState } from '~/Redux/Modal';
import mutation from '~/Graphql/mutation/updatePassword.graphql';
import ChangePasswordForm from '../ChangePassword/Form';
import Dialog from '~/Component/Dialog';
import Text from '~/Component/Text';
import TouchableView from '~/Component/TouchableView';

class ChangePasswordScene extends Component {
  static propTypes = {
    mutate: PropTypes.func,
    navigateToLogin: PropTypes.func,
    showDialogModal: PropTypes.func,
    hideDialogModal: PropTypes.func,
    modal: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.state = {
      error: undefined,
      loading: false,
      isDialogOpen: this.props.modal.isOpen,
    };

    this._handleUpdate = this._handleUpdate.bind(this);
    this._handleBackToHome = this._handleBackToHome.bind(this);
  }

  componentWillMount() {
    if (this.state.isDialogOpen) {
      this.setState({
        isDialogOpen: false,
      });
    }
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
          isDialogOpen: true,
        });

        this.props.showDialogModal();
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

  _handleBackToHome() {
    this.setState({
      isDialogOpen: false,
    });
    this.props.navigateToLogin();
  }

  _renderDialog = () =>
    <Dialog isVisible={this.state.isDialogOpen} header={'Alert'}>
      <View
        style={{
          paddingHorizontal: Metrics.doubleBaseMargin,
        }}
      >
        <Text>Your password has been updated successfully.</Text>

        <TouchableView
          style={{
            paddingVertical: Metrics.doubleBaseMargin,
            alignItems: 'flex-end',
          }}
          onPress={this._handleBackToHome}
        >
          <Text>Back to Login</Text>
        </TouchableView>
      </View>
    </Dialog>;

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ChangePasswordForm
          loading={this.state.loading}
          changePasswordError={this.state.error}
          onPasswordChanged={this._handleUpdate}
        />
        {this._renderDialog()}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  modal: state[KEY],
});

const mapDispatchToProps = dispatch => ({
  navigateToLogin: () =>
    dispatch(NavigationActions.navigate({ routeName: 'login' })),
  showDialogModal: () => dispatch(setModalState(true)),
  hideDialogModal: () => dispatch(setModalState(false)),
});

const Scene = compose(
  connect(mapStateToProps, mapDispatchToProps),
  graphql(gql(mutation)),
)(ChangePasswordScene);

Scene.drawer = {
  primary: true,
};

export default Scene;
