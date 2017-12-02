import React from 'react';
import PropTypes from 'prop-types';
import { Image, View, KeyboardAvoidingView } from 'react-native';
import { Icon } from 'react-native-elements';
import { withFormik } from 'formik';
import yup from 'yup';

import { Text, TouchableView, AnimatableView } from '~/Component';
import { Images, Colors } from '~/Theme';
import AppFormInput from '~/Component/AppFormInput';
import styles from '../styles';
import { PASSWORD_REGEX } from '~/Lib/constants';

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

const LoginForm = ({
  onNavigate,
  values,
  handleSubmit,
  setFieldValue,
  setFieldTouched,
  dirty,
  isValid,
  isSubmitting,
  errors,
  touched,
}) => {
  const isInvalid = dirty && !isValid;
  return (
    <KeyboardAvoidingView behavior={'padding'} style={styles.container}>
      {_renderHeaderImage()}
      <View style={styles.formContainer}>
        <AppFormInput
          name="email"
          label="Email"
          value={values.email}
          error={errors.email}
          touched={touched.email}
          setValue={setFieldValue}
          toggleTouched={setFieldTouched}
        />

        <AppFormInput
          name="password"
          label="Password"
          value={values.password}
          error={errors.password}
          touched={touched.password}
          setValue={setFieldValue}
          toggleTouched={setFieldTouched}
          secureTextEntry
        />
      </View>
      <View style={styles.buttonContainer}>
        {isSubmitting ? (
          _renderLoadingButton()
        ) : (
          <TouchableView
            disabled={isInvalid}
            onPress={handleSubmit}
            style={
              dirty && !isValid
                ? styles.disabledSubmitButton
                : styles.submitButton
            }
          >
            <Text bold style={styles.buttonText}>
              LOGIN
            </Text>
          </TouchableView>
        )}
      </View>
      <View>
        <TouchableView onPress={onNavigate}>
          <Text style={styles.footerText}>Forgot your password.</Text>
          <Text medium style={styles.signUpText}>
            {"Don't have an account. Register"}
          </Text>
        </TouchableView>
      </View>
    </KeyboardAvoidingView>
  );
};

LoginForm.propTypes = {
  onLogin: PropTypes.func,
  onNavigate: PropTypes.func,
  // Formik goodies
  values: PropTypes.shape({
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }).isRequired,
  setFieldValue: PropTypes.func.isRequired,
  setFieldTouched: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  dirty: PropTypes.bool.isRequired,
  isValid: PropTypes.bool.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  errors: PropTypes.shape({
    email: PropTypes.string,
    password: PropTypes.string,
  }),
  touched: PropTypes.shape({
    email: PropTypes.bool,
    password: PropTypes.bool,
  }).isRequired,
};

LoginForm.defaultProps = {
  touched: {
    email: false,
    password: false,
  },
};

export default withFormik({
  displayName: 'LoginFormContainer',
  mapPropsToValues: () => ({
    email: '',
    password: '',
  }),
  validationSchema: yup.object().shape({
    email: yup
      .string()
      .required('Email is required!')
      .email('Invalid email address'),
    password: yup
      .string()
      .required('Password is required')
      .matches(PASSWORD_REGEX, 'Invalid password!'),
  }),
  validateOnBlur: true,
  validateOnChange: true,
  handleSubmit: (values, { props, setSubmitting, setFieldError }) => {
    setSubmitting(true);
    props.onLogin(values, setFieldError);
    setSubmitting(false);
  },
})(LoginForm);
