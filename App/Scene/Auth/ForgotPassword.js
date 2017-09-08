import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { required, email } from '~/Lib/validate';

import { KeyboardAvoidingView, Image, View } from 'react-native';
import { Images } from '~/Theme';
import FormInput from '~/Component/FormInput';
import TouchableView from '~/Component/TouchableView';
import Text from '~./Component/Text';
import styles from './styles';

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
  form: 'forgotPassword',
})(ForgotPasswordForm);

class ForgotPasswordScene extends Component {
  /**
     * Header config
     */
  static header = {
    theme: 'light',
    leftIcon: 'back',
    actions: [
      {
        icon: {
          name: 'lock',
        },
        onPress: () => {},
      },
    ],
  };
  render() {
    return <ForgotPasswordForm />;
  }
}

export default ForgotPasswordScene;
