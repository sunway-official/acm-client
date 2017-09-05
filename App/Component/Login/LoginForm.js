import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Image,
  View,
} from 'react-native';
import { Field, reduxForm } from 'redux-form';

import styles from './styles';
import FormInput from '../FormInput';

const submit = values => {
  console.log('submitting form', values);
};

const LoginForm = ({ handleSubmit, submitting }) => (
  <KeyboardAvoidingView
    onSubmit={handleSubmit}
    style={styles.container}
    behavior={'position'}
  >
    <View style={styles.imageContainer}>
      <Image
        style={styles.image}
        source={{ uri: 'http://placehold.it/250x250' }}
      />
    </View>
    <View style={styles.formContainer}>
      <Field
        name="email"
        type="email"
        component={FormInput}
        placeholder="Email"
        underlineColorAndroid={'transparent'}
        keyboardType={'email-address'}
      />
      <Field
        name="password"
        type="password"
        component={FormInput}
        placeholder="Password"
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
    </View>
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
})(LoginForm);

export default LoginForm;
