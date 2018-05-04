import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { required, email } from 'Lib/validate';
import { Icon } from 'react-native-elements';
import { KeyboardAvoidingView, View, ScrollView } from 'react-native';
import { Colors } from 'Theme';
import { Text, TouchableView, FormInput, AnimatableView } from 'Component';
import styles from '../styles';

const _renderHeader = errorText => (
  <View style={styles.imageContainer}>
    <Text bold style={styles.registerTitle}>
      REGISTER
    </Text>
    <Text light style={styles.registerDescription}>
      FILL OUT YOUR INFORMATION
    </Text>
    <Text small light style={styles.errorText}>
      {errorText}
    </Text>
  </View>
);

const _renderForm = () => (
  <View style={styles.formContainer}>
    <View style={styles.registerField}>
      <Text>First name</Text>
      <Field
        name="firstname"
        component={FormInput}
        validate={[required]}
        placeholder="Type your first name"
        underlineColorAndroid={'transparent'}
      />
    </View>
    <View style={styles.registerField}>
      <Text>Last name</Text>
      <Field
        name="lastname"
        component={FormInput}
        validate={[required]}
        placeholder="Type your last name"
        underlineColorAndroid={'transparent'}
      />
    </View>
    <View style={styles.registerField}>
      <Text>Username</Text>
      <Field
        name="username"
        component={FormInput}
        validate={[required]}
        placeholder="Type your username"
        underlineColorAndroid={'transparent'}
      />
    </View>
    <View style={styles.registerField}>
      <Text>Email</Text>
      <Field
        name="email"
        component={FormInput}
        validate={[required, email]}
        placeholder="Type your Email"
        underlineColorAndroid={'transparent'}
        keyboardType={'email-address'}
      />
    </View>
    <View style={styles.registerField}>
      <Text>Password</Text>
      <Field
        name="password"
        type="password"
        component={FormInput}
        validate={[required]}
        placeholder="Type your password"
        secureTextEntry={true}
        underlineColorAndroid={'transparent'}
        returnKeyType={'done'}
      />
    </View>
    <View style={styles.registerField}>
      <Text>Organization</Text>
      <Field
        name="organization"
        component={FormInput}
        validate={[required]}
        placeholder="Type your organization"
        underlineColorAndroid={'transparent'}
      />
    </View>
    <View style={styles.registerField}>
      <Text>Biography</Text>
      <Field
        name="biography"
        component={FormInput}
        validate={[required]}
        placeholder="Type something about yourself"
        underlineColorAndroid={'transparent'}
      />
    </View>
  </View>
);

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

const _renderButton = args => {
  const { handleSubmit, loading, onRegister, onBack } = args;
  return (
    <View style={[styles.buttonContainer, styles.registerButtonContainer]}>
      <View style={styles.registerSubmitButton}>
        {loading ? (
          _renderLoadingButton()
        ) : (
          <TouchableView
            onPress={handleSubmit(onRegister)}
            style={styles.submitButton}
          >
            <Text bold style={styles.buttonText}>
              REGISTER
            </Text>
          </TouchableView>
        )}
      </View>
      <TouchableView onPress={onBack}>
        <Text medium style={styles.signUpText}>
          Back
        </Text>
      </TouchableView>
    </View>
  );
};

const RegisterForm = ({
  handleSubmit,
  loading,
  onRegister,
  onBack,
  errorText,
}) => (
  <KeyboardAvoidingView onSubmit={handleSubmit} behavior={'padding'}>
    <ScrollView
      style={[styles.registerFormContainer]}
      keyboardShouldPersistTaps="always"
      // automaticallyAdjustContentInsets={false}
      horizontal={false}
    >
      {_renderHeader(errorText)}
      {_renderForm()}
      {_renderButton({ handleSubmit, loading, onRegister, onBack })}
    </ScrollView>
  </KeyboardAvoidingView>
);

RegisterForm.defaultProps = {
  error: null,
};

RegisterForm.propTypes = {
  handleSubmit: PropTypes.func,
  onRegister: PropTypes.func,
  loading: PropTypes.bool,
  reset: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  invalid: PropTypes.bool.isRequired,
  errorText: PropTypes.string,
  onBack: PropTypes.func,
};

export default reduxForm({
  form: 'register',
})(RegisterForm);
