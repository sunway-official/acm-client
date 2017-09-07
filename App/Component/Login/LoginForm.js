import React from 'react';
import PropTypes from 'prop-types';
import { Text, KeyboardAvoidingView, Image, View } from 'react-native';
import { Field, reduxForm } from 'redux-form';

import styles from './styles';
import { Images } from '../../Theme';
import FormInput from '../FormInput';
import TouchableView from '../TouchableView';
import { required, email, password } from '../../Lib/validate';

const submit = values => {
  console.log('submitting form', values);
};

const LoginForm = ({ handleSubmit, submitting }) =>
  <KeyboardAvoidingView
    onSubmit={handleSubmit}
    style={styles.container}
    behavior={'position'}
  >
    <View style={styles.imageContainer}>
      <Image style={styles.image} source={Images.imgDefault250} />
    </View>
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
    </View>
    <View style={styles.buttonContainer}>
      <TouchableView onPress={handleSubmit(submit)} style={styles.loginButton}>
        <Text style={styles.buttonText}>LOGIN</Text>
      </TouchableView>
    </View>
    <Text style={styles.footerText}>Forgot password?</Text>
  </KeyboardAvoidingView>;

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
