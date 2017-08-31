import React from 'react';
import PropTypes from 'prop-types';
import { Text, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { Field, reduxForm } from 'redux-form';

import styles from './styles';
import FormInput from './FormInput';

const submit = values => {
  console.log('submitting form', values);
};

const LoginForm = props => {
  const { handleSubmit } = props;

  return (
    <KeyboardAvoidingView onSubmit={handleSubmit} style={styles.container}>
      <Field
        name="email"
        type="email"
        label="Email"
        component={FormInput}
        placeholder="type your email.."
        underlineColorAndroid={'transparent'}
        keyboardType={'email-address'}
      />
      <Field
        name="password"
        type="password"
        label="Password"
        component={FormInput}
        placeholder="type your password.."
        underlineColorAndroid={'transparent'}
        secureTextEntry={true}
        returnKeyType={'done'}
      />
      <TouchableOpacity onPress={handleSubmit(submit)} style={styles.button}>
        <Text style={styles.buttonText}>LOGIN</Text>
      </TouchableOpacity>
      <Text style={styles.footerText}>Forgot password?</Text>
    </KeyboardAvoidingView>
  );
};

LoginForm.defaultProps = {
  error: null,
};

LoginForm.propTypes = {
  handleSubmit: PropTypes.func,
};

LoginForm = reduxForm({
  form: 'login',
})(LoginForm);

export default LoginForm;
