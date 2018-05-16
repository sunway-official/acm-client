import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { AsyncStorage, Keyboard } from 'react-native';
import { reset } from 'redux-form';
import { NavigationActions } from 'Reduck/Navigation';
import RegisterForm from './Form';
import { compose, gql, graphql, withApollo } from 'react-apollo';
import mutation from 'Graphql/mutation/register.graphql';

class RegisterScene extends Component {
  static propTypes = {
    client: PropTypes.any,
    mutate: PropTypes.func,
    navigate: PropTypes.func,
    resetForm: PropTypes.func,
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
      errorText: '',
      loading: false,
    };

    this._submit = this._submit.bind(this);
    this._onBack = this._onBack.bind(this);
  }

  async _submit(values) {
    const { mutate, navigate } = this.props;

    try {
      if (Object.keys(values).length === 0 && values.constructor === Object) {
        this.setState({
          errorText: 'Please fill out your information.',
        });

        return;
      } else {
        this.setState({ loading: true });
      }

      Keyboard.dismiss();

      await mutate({
        variables: { ...values, email: values.email.toLowerCase() },
      });

      this.setState({ loading: false, errorText: '' });
      navigate('login');
    } catch (error) {
      this.setState({
        errorText: 'This email is already existed.',
        loading: false,
      });
    }
  }

  _onBack() {
    this.props.navigate('login');
  }

  componentDidMount() {
    const { resetForm } = this.props;
    resetForm();
    AsyncStorage.multiRemove(['token', 'refreshToken']);
  }

  componentWillUnmount() {
    Keyboard.dismiss();
  }

  render() {
    return (
      <RegisterForm
        loading={this.state.loading}
        onRegister={this._submit}
        onBack={this._onBack}
        errorText={this.state.errorText}
      />
    );
  }
}

const mapDispatchToProps = dispatch => ({
  navigate: routeName =>
    dispatch(
      NavigationActions.navigate({
        routeName,
      }),
    ),
  resetForm: () => dispatch(reset('register')),
});

export default compose(
  connect(undefined, mapDispatchToProps),
  graphql(gql(mutation)),
  withApollo,
)(RegisterScene);
