import React from 'react';
import PropTypes from 'prop-types';
import { Text, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { Field, reduxForm } from 'redux-form';

import styles from './styles';
import { required, email, password } from '../../Lib/validate';
import FormInput from './FormInput';

const submit = values => {
  console.log('submitting form', values);
};

const LoginForm = ({ handleSubmit, submitting }) => (
  <KeyboardAvoidingView onSubmit={handleSubmit} style={styles.container}>
    <Field
      name="email"
      type="email"
      label="Email"
      component={FormInput}
      validate={[required, email]}
      placeholder="type your email.."
      underlineColorAndroid={'transparent'}
      keyboardType={'email-address'}
    />
    <Field
      name="password"
      type="password"
      label="Password"
      component={FormInput}
      validate={[required, password]}
      placeholder="type your password.."
      underlineColorAndroid={'transparent'}
      secureTextEntry={true}
      returnKeyType={'done'}
    />
    <TouchableOpacity
      onPress={handleSubmit(submit)}
      style={styles.button}
      disabled={submitting}
    >
      <Text style={styles.buttonText}>LOGIN</Text>
    </TouchableOpacity>
    <Text style={styles.footerText}>Forgot password?</Text>
  </KeyboardAvoidingView>
);

LoginForm.defaultProps = {
  error: null,
};

LoginForm.propTypes = {
  handleSubmit: PropTypes.func,
  reset: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  pristine: PropTypes.bool.isRequired,
  invalid: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

LoginForm = reduxForm({
  form: 'login',
  // validate,
})(LoginForm);

export default LoginForm;
