import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { required, email, password } from '~/Lib/validate';

import styles from './styles';

import { View, Image, KeyboardAvoidingView } from 'react-native';
import { Text } from '~/Component';
import { Images, Colors, Metrics } from '~/Theme';
import FormInput from '~/Component/FormInput';
import TouchableView from '~/Component/TouchableView';

const _renderForm = () =>
  <View style={{}}>
    <Field
      name="old-password"
      component={FormInput}
      validate={[required, password]}
      placeholder="Old password"
      underlineColorAndroid={'transparent'}
      secureTextEntry={true}
      returnKeyType={'next'}
    />
    <Field
      name="new-password"
      component={FormInput}
      validate={[required, password]}
      placeholder="New password"
      underlineColorAndroid={'transparent'}
      secureTextEntry={true}
      returnKeyType={'next'}
    />
    <Field
      name="confirm-password"
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
        {error}
      </Text>}
  </View>;

const _renderButton = args => {
  const { handleSubmit, onChangePassword, loading } = args;
  return (
    <View
      style={{
        alignItems: 'flex-start',
      }}
    >
      {loading
        ? _renderLoadingButton()
        : <TouchableView
            onPress={handleSubmit(onChangePassword)}
            rippleColor={Colors.grey}
            style={{
              borderWidth: 0.5,
              marginTop: Metrics.doubleBaseMargin,
              borderRadius: Metrics.buttonCornerRadius,
              paddingVertical: Metrics.baseMargin,
              paddingHorizontal: Metrics.baseMargin,
            }}
          >
            <Text bold>Update password</Text>
          </TouchableView>}
    </View>
  );
};

const ChangePasswordForm = ({
  onChangePassword,
  onNavigate,
  handleSubmit,
  loading,
  loginError,
}) => {
  return (
    <KeyboardAvoidingView
      behavior={'padding'}
      style={{
        flex: 1,
        flexDirection: 'column',
        paddingHorizontal: Metrics.doubleBaseMargin,
        backgroundColor: Colors.secondaryLight,
      }}
    >
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
  form: 'change-password',
})(ChangePasswordForm);

export default ChangePasswordForm;
