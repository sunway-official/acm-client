import React from 'react';
import PropTypes from 'prop-types';
import { Text, KeyboardAvoidingView, Image, View } from 'react-native';
import { Field, reduxForm } from 'redux-form';
// import { View as AnimatableView } from 'react-native-animatable';

import styles from './styles';
import { Images } from '../../Theme';
import FormInput from '../FormInput';
import TouchableView from '../TouchableView';
import { required, email } from '../../Lib/validate';

const submit = values => {
  console.log('submitting form', values);
};

const ForgotPasswordForm = ({ handleSubmit }) =>
  <KeyboardAvoidingView
    onSubmit={handleSubmit}
    style={styles.container}
    behavior={'position'}
  >
    <View style={styles.imageContainer}>
      <Image style={styles.image} source={Images.imgDefault150} />
      <Text style={styles.title}>Forgot Your Password?</Text>
      <Text style={styles.description}>
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
      <TouchableView onPress={handleSubmit(submit)} style={styles.sendButton}>
        <Text style={styles.buttonText}>SEND</Text>
      </TouchableView>
      <TouchableView onPress={handleSubmit(submit)} style={styles.backButton}>
        <Text style={styles.buttonText}>BACK</Text>
      </TouchableView>
    </View>
  </KeyboardAvoidingView>;

ForgotPasswordForm.defaultProps = {
  error: null,
};

ForgotPasswordForm.propTypes = {
  handleSubmit: PropTypes.func,
  reset: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  invalid: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

ForgotPasswordForm = reduxForm({
  form: 'login',
})(ForgotPasswordForm);

export default ForgotPasswordForm;
