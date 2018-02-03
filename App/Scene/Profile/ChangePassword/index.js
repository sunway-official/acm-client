import React, { Component } from 'react';
import { AsyncStorage, Keyboard, View } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavigationActions } from 'Reduck/Navigation';
import { gql, graphql, compose, withApollo } from 'react-apollo';
import { Text, TouchableView, LoadingIndicator, Dialog } from 'Component';
import { Metrics } from 'Theme';
import { KEY, setModalState } from 'Reduck/Modal';
import mutation from 'Graphql/mutation/updatePassword.graphql';
import ChangePasswordForm from '../ChangePassword/Form';
import styles from './styles';

class ChangePasswordScene extends Component {
  static propTypes = {
    mutate: PropTypes.func,
    client: PropTypes.any,
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
    this._navigateToLogin = this._navigateToLogin.bind(this);
  }

  componentWillMount() {
    if (this.state.isDialogOpen) {
      this.setState({
        isDialogOpen: false,
      });
    }
  }

  componentWillUnmount() {
    Keyboard.dismiss();
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

  _navigateToLogin() {
    this.setState({
      isDialogOpen: false,
    });
    this.props.client.resetStore();
    this.props.navigateToLogin();
  }

  _renderDialog = () => (
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
          onPress={this._navigateToLogin}
        >
          <Text>Back to Login</Text>
        </TouchableView>
      </View>
    </Dialog>
  );

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ChangePasswordForm
          loading={this.state.loading}
          changePasswordError={this.state.error}
          onPasswordChanged={this._handleUpdate}
        />
        {this._renderDialog()}
        {this.state.loading ? (
          <View style={styles.loadingContainer}>
            <LoadingIndicator />
          </View>
        ) : null}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  modal: state[KEY],
});

const mapDispatchToProps = dispatch => ({
  navigateToLogin: () =>
    dispatch(NavigationActions.reset({ routeName: 'login' })),
  showDialogModal: () => dispatch(setModalState(true)),
  hideDialogModal: () => dispatch(setModalState(false)),
});

const Scene = compose(
  connect(mapStateToProps, mapDispatchToProps),
  graphql(gql(mutation)),
  withApollo,
)(ChangePasswordScene);

Scene.header = {
  leftIcon: 'back',
};

Scene.drawer = {
  disableGestures: true,
};

export default Scene;
