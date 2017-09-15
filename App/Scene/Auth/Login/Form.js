import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { required, email, password } from '~/Lib/validate';

import { KeyboardAvoidingView, Image, View } from 'react-native';
import { Images } from '~/Theme';
import FormInput from '~/Component/FormInput';
import TouchableView from '~/Component/TouchableView';
import Text from '~./Component/Text';
import styles from '../styles';

const submit = values => {
  console.log('submitting form', values);
};

const _renderHeaderImage = () =>
  <View style={styles.imageContainer}>
    <Image style={styles.image} source={Images.login} />
  </View>;

const _renderForm = () =>
  <View style={styles.formContainer}>
    <Field
      name="email"
      type="email"
      component={FormInput}
      validate={[required, email]}
      placeholder="Email"
      underlineColorAndroid={'transparent'}
      keyboardType={'email-address'}
    />
    <Field
      name="password"
      type="password"
      component={FormInput}
      validate={[required, password]}
      placeholder="Password"
      underlineColorAndroid={'transparent'}
      secureTextEntry={true}
      returnKeyType={'done'}
    />
  </View>;

const _renderButton = handleSubmit =>
  <View style={styles.buttonContainer}>
    <TouchableView onPress={handleSubmit(submit)} style={styles.submitButton}>
      <Text bold style={styles.buttonText}>
        LOGIN
      </Text>
    </TouchableView>
  </View>;

const _renderFooter = onNavigate =>
  <View>
    <TouchableView onPress={onNavigate}>
      <Text style={styles.footerText}>Forgot your password.</Text>
      <Text medium style={styles.signUpText}>
        {"Don't have an account. Register"}
      </Text>
    </TouchableView>
  </View>;

const LoginForm = ({ onLogin, onNavigate, handleSubmit }) =>
  <KeyboardAvoidingView
    onLogin={handleSubmit(onLogin)}
    onNavigate={handleSubmit(onNavigate)}
    style={styles.container}
    behavior={'position'}
  >
    {_renderHeaderImage()}
    {_renderForm()}
    {_renderButton(handleSubmit)}
    {_renderFooter(onNavigate)}
  </KeyboardAvoidingView>;

LoginForm.defaultProps = {
  error: null,
};

LoginForm.propTypes = {
  onLogin: PropTypes.func,
  onNavigate: PropTypes.func,
  handleSubmit: PropTypes.func,
  reset: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  invalid: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

LoginForm = reduxForm({
  form: 'login',
})(LoginForm);

export default LoginForm;
