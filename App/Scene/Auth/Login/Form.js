import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { required, email, password } from '~/Lib/validate';

import { KeyboardAvoidingView, Image, View } from 'react-native';
import { Images } from '~/Theme';
import FormInput from '~/Component/FormInput';
import TouchableView from '~/Component/TouchableView';
import Text from '~./Component/Text';
import styles from '../styles';

const submit = values => {
  console.log('submitting form', values);
};

class LoginForm extends PureComponent {
  static defaultProps = {
    error: null,
  };

  static propTypes = {
    onLogin: PropTypes.func,
    onNavigate: PropTypes.func,
    handleSubmit: PropTypes.func,
    reset: PropTypes.func.isRequired,
    pristine: PropTypes.bool.isRequired,
    invalid: PropTypes.bool.isRequired,
    error: PropTypes.string,
  };

  _renderHeaderImage() {
    return (
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={Images.imgDefault250} />
      </View>
    );
  }

  _renderForm() {
    return (
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
    );
  }

  _renderButton() {
    const { handleSubmit } = this.props;
    return (
      <View style={styles.buttonContainer}>
        <TouchableView
          onPress={handleSubmit(submit)}
          style={styles.submitButton}
        >
          <Text bold style={styles.buttonText}>
            LOGIN
          </Text>
        </TouchableView>
      </View>
    );
  }

  _renderFooter() {
    const { onNavigate } = this.props;
    return (
      <View>
        <TouchableView onPress={onNavigate}>
          <Text style={styles.footerText}>Forgot your password.</Text>
          <Text medium style={styles.signUpText}>
            {"Don't have an account. Register"}
          </Text>
        </TouchableView>
      </View>
    );
  }

  render() {
    const { onLogin, onNavigate, handleSubmit } = this.props;
    return (
      <KeyboardAvoidingView
        onLogin={handleSubmit(onLogin)}
        onNavigate={handleSubmit(onNavigate)}
        style={styles.container}
        behavior={'position'}
      >
        {this._renderHeaderImage()}
        {this._renderForm()}
        {this._renderButton()}
        {this._renderFooter()}
      </KeyboardAvoidingView>
    );
  }
}

LoginForm = reduxForm({
  form: 'login',
})(LoginForm);

export default LoginForm;
