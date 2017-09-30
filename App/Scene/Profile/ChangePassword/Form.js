import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { required, email, password } from '~/Lib/validate';
import { View, Image, KeyboardAvoidingView } from 'react-native';
import { View as AnimatableView } from 'react-native-animatable';
import { Icon } from 'react-native-elements';

import styles from './styles';
import { Images, Colors, Metrics } from '~/Theme';

import { Text } from '~/Component';
import FormInput from '~/Component/FormInput';
import TouchableView from '~/Component/TouchableView';

const _renderLoadingButton = () =>
  <View style={[styles.loadingContainer, , styles.loadingText]}>
    <AnimatableView
      animation="rotate"
      duration={1000}
      iterationCount="infinite"
    >
      <Icon name="loop" color={Colors.white} />
    </AnimatableView>
  </View>;

const _renderHint = () =>
  <View style={styles.hintContainer}>
    <Text light style={styles.hintText}>
      Password must be at least 6 characters including a number, a special
      characters, an uppercase letter and a lowercase letter. *
    </Text>
  </View>;

const _renderForm = () =>
  <View style={styles.formContainer}>
    <Text bold>Current password *</Text>
    <Field
      name="oldPassword"
      component={FormInput}
      validate={[required, password]}
      placeholder="Current password"
      underlineColorAndroid={'transparent'}
      secureTextEntry={true}
      returnKeyType={'next'}
    />
    <Text bold style={styles.descriptionText}>
      Change password *
    </Text>
    <Field
      name="newPassword"
      component={FormInput}
      validate={[required, password]}
      placeholder="New password"
      underlineColorAndroid={'transparent'}
      secureTextEntry={true}
      returnKeyType={'next'}
    />
    <Field
      name="confirmNewPassword"
      component={FormInput}
      validate={[required, password]}
      placeholder="Confirm new password"
      underlineColorAndroid={'transparent'}
      secureTextEntry={true}
      returnKeyType={'done'}
    />
  </View>;

const _renderError = error =>
  <View>
    {error === undefined ||
      <Text style={styles.errorText}>
        Please check again! {error}
      </Text>}
  </View>;

const _renderButton = args => {
  const { handleSubmit, onChangePassword, loading } = args;
  return (
    <View style={styles.buttonContainer}>
      {loading
        ? _renderLoadingButton()
        : <TouchableView
            onPress={handleSubmit(onChangePassword)}
            rippleColor={Colors.primary}
            style={styles.actionButton}
          >
            <Text bold style={styles.actionText}>
              Update
            </Text>
          </TouchableView>}
    </View>
  );
};

const ChangePasswordForm = ({
  onChangePassword,
  handleSubmit,
  loading,
  loginError,
}) => {
  return (
    <KeyboardAvoidingView behavior={'padding'} style={styles.container}>
      {_renderHint()}
      {_renderForm()}
      {_renderError(loginError)}
      {_renderButton({ handleSubmit, onChangePassword, loading })}
    </KeyboardAvoidingView>
  );
};

ChangePasswordForm.defaultProps = {
  error: null,
};

ChangePasswordForm.propTypes = {
  onChangePassword: PropTypes.func,
  onNavigate: PropTypes.func,
  handleSubmit: PropTypes.func,
  reset: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  invalid: PropTypes.bool.isRequired,
  error: PropTypes.string,
  loginError: PropTypes.string,
  loading: PropTypes.bool,
};

ChangePasswordForm = reduxForm({
  form: 'updatePassword',
})(ChangePasswordForm);

export default ChangePasswordForm;
