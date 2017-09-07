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
import { Images } from '../../Theme';
import FormInput from '../FormInput';
import { required, email } from '../../Lib/validate';

const submit = values => {
  console.log('submitting form', values);
};

const ForgotPasswordForm = ({ handleSubmit, submitting }) => (
  <KeyboardAvoidingView
    onSubmit={handleSubmit}
    style={styles.container}
    behavior={'position'}
  >
    <View style={styles.imageContainer}>
      <Image style={styles.image} source={Images.imgDefault150} />
      <Text
        style={{
          paddingTop: 20,
          fontSize: 20,
          fontWeight: 'normal',
        }}
      >
        Forgot Your Password?
      </Text>
      <Text
        style={{
          fontSize: 12,
          paddingBottom: 50,
        }}
      >
        Enter your email below to reset your password
      </Text>
    </View>
    <View style={styles.formContainer}>
      <Field
        name="email"
        type="email"
        component={FormInput}
        validate={[required, email]}
        placeholder="Type your Email"
        underlineColorAndroid={'transparent'}
        keyboardType={'email-address'}
      />
    </View>
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        onPress={handleSubmit(submit)}
        style={styles.sendButton}
        disabled={submitting}
      >
        <Text style={styles.buttonText}>SEND</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleSubmit(submit)}
        style={styles.backButton}
        disabled={submitting}
      >
        <Text style={styles.buttonText}>BACK</Text>
      </TouchableOpacity>
    </View>
  </KeyboardAvoidingView>
);

ForgotPasswordForm.defaultProps = {
  error: null,
};

ForgotPasswordForm.propTypes = {
  handleSubmit: PropTypes.func,
  reset: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  pristine: PropTypes.bool.isRequired,
  invalid: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

ForgotPasswordForm = reduxForm({
  form: 'login',
})(ForgotPasswordForm);

export default ForgotPasswordForm;
