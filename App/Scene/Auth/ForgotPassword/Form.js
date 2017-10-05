import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { required, email } from '~/Lib/validate';

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
    <Image style={styles.image} source={Images.forgotPassword} />
    <Text bold style={styles.title}>
      Forgot Your Password
    </Text>
    <Text light style={styles.description}>
      Enter your email to retrieve your own password
    </Text>
  </View>;

const _renderForm = () =>
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
  </View>;

const _renderButton = handleSubmit =>
  <View style={styles.buttonContainer}>
    <TouchableView onPress={handleSubmit(submit)} style={styles.submitButton}>
      <Text bold style={styles.buttonText}>
        SEND
      </Text>
    </TouchableView>
  </View>;

const ForgotPasswordForm = ({ handleSubmit }) =>
  <KeyboardAvoidingView
    onSubmit={handleSubmit}
    style={styles.container}
    behavior={'padding'}
  >
    {_renderHeaderImage()}
    {_renderForm()}
    {_renderButton(handleSubmit)}
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
  form: 'forgotPassword',
})(ForgotPasswordForm);

export default ForgotPasswordForm;
