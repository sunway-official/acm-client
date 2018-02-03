import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { required, password } from 'Lib/validate';
import { View, KeyboardAvoidingView } from 'react-native';
import styles from './styles';
import { Colors } from 'Theme';
import { Text, FormInput } from 'Component';
import TouchableView from 'Component/TouchableView';

const _renderHint = () => (
  <View style={styles.hintContainer}>
    <Text light style={styles.hintText}>
      Password must be at least 6 characters including a number, a special
      characters, and a letter. *
    </Text>
  </View>
);

const _renderForm = () => (
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
      containerStyle={styles.containerStyle}
    />
    <Field
      name="confirmNewPassword"
      component={FormInput}
      validate={[required, password]}
      placeholder="Confirm new password"
      underlineColorAndroid={'transparent'}
      secureTextEntry={true}
      returnKeyType={'done'}
      containerStyle={styles.containerStyle}
    />
  </View>
);

const _renderError = error => (
  <View>
    {error === undefined || (
      <Text style={styles.errorText}>Please check again! {error}</Text>
    )}
  </View>
);

const _renderButton = args => {
  const { handleSubmit, onPasswordChanged } = args;
  return (
    <View style={styles.buttonContainer}>
      <TouchableView
        onPress={handleSubmit(onPasswordChanged)}
        rippleColor={Colors.primary}
        style={styles.actionButton}
      >
        <Text bold style={styles.actionText}>
          Update
        </Text>
      </TouchableView>
    </View>
  );
};

const ChangePasswordForm = ({
  onPasswordChanged,
  handleSubmit,
  changePasswordError,
}) => {
  return (
    <KeyboardAvoidingView behavior={'padding'} style={styles.container}>
      {_renderHint()}
      {_renderForm()}
      {_renderError(changePasswordError)}
      {_renderButton({ handleSubmit, onPasswordChanged })}
    </KeyboardAvoidingView>
  );
};

ChangePasswordForm.defaultProps = {
  error: null,
};

ChangePasswordForm.propTypes = {
  onPasswordChanged: PropTypes.func,
  onNavigate: PropTypes.func,
  handleSubmit: PropTypes.func,
  reset: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  invalid: PropTypes.bool.isRequired,
  error: PropTypes.string,
  changePasswordError: PropTypes.string,
};

export default reduxForm({
  form: 'updatePassword',
})(ChangePasswordForm);
