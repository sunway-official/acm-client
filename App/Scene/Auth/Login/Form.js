import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { required, email, password } from 'Lib/validate';
import { Icon } from 'react-native-elements';
import { Image, View, KeyboardAvoidingView } from 'react-native';
import { Images, Colors } from 'Theme';
import { FormInput, Text, TouchableView, AnimatableView } from 'Component';
import styles from '../styles';

const _renderLoadingButton = () => (
  <View style={[styles.submitButton, styles.loadingButton]}>
    <AnimatableView
      animation="rotate"
      duration={1000}
      iterationCount="infinite"
    >
      <Icon name="loop" color={Colors.white} />
    </AnimatableView>
  </View>
);

const _renderHeaderImage = () => (
  <View style={styles.imageContainer}>
    <Image style={styles.image} source={Images.login} />
  </View>
);

const _renderForm = () => (
  <View style={styles.formContainer}>
    <Field
      name="email"
      component={FormInput}
      validate={[required, email]}
      placeholder="Email"
      underlineColorAndroid={'transparent'}
      keyboardType={'email-address'}
    />
    <Field
      name="password"
      component={FormInput}
      validate={[required, password]}
      placeholder="Password"
      underlineColorAndroid={'transparent'}
      secureTextEntry={true}
      returnKeyType={'done'}
    />
  </View>
);

const _renderButton = args => {
  const { handleSubmit, onLogin, loading } = args;
  return (
    <View style={styles.buttonContainer}>
      {loading ? (
        _renderLoadingButton()
      ) : (
        <TouchableView
          onPress={handleSubmit(onLogin)}
          style={styles.submitButton}
        >
          <Text bold style={styles.buttonText}>
            LOGIN
          </Text>
        </TouchableView>
      )}
    </View>
  );
};

const _renderFooter = (onNavigateToForgotPassword, onNavigateToRegister) => (
  <View>
    <TouchableView onPress={onNavigateToForgotPassword}>
      <Text style={styles.footerText}>Forgot your password.</Text>
    </TouchableView>
    <TouchableView onPress={onNavigateToRegister}>
      <Text medium style={styles.signUpText}>
        {"Don't have an account. Register"}
      </Text>
    </TouchableView>
  </View>
);

const _renderError = error => (
  <View>
    {error === undefined || <Text style={styles.errorText}>{error}</Text>}
  </View>
);

const LoginForm = ({
  onLogin,
  onNavigateToForgotPassword,
  onNavigateToRegister,
  handleSubmit,
  loading,
  loginError,
}) => {
  return (
    <KeyboardAvoidingView behavior={'padding'} style={styles.container}>
      {_renderHeaderImage()}
      {_renderForm()}
      {_renderError(loginError)}
      {_renderButton({ handleSubmit, onLogin, loading })}
      {_renderFooter(onNavigateToForgotPassword, onNavigateToRegister)}
    </KeyboardAvoidingView>
  );
};

LoginForm.defaultProps = {
  error: null,
};

LoginForm.propTypes = {
  onLogin: PropTypes.func,
  onNavigateToForgotPassword: PropTypes.func,
  onNavigateToRegister: PropTypes.func,
  handleSubmit: PropTypes.func,
  reset: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  invalid: PropTypes.bool.isRequired,
  error: PropTypes.string,
  loginError: PropTypes.string,
  loading: PropTypes.bool,
};

export default reduxForm({
  form: 'login',
})(LoginForm);
