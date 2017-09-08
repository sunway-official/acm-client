import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';
import { Field, reduxForm } from 'redux-form';
import { required, email, password } from '~/Lib/validate';
import { KEY, setLoggedIn } from '~/Redux/Login';

import { KeyboardAvoidingView, Image, View } from 'react-native';
// import routes from '~/routes';
import { Images } from '~/Theme';
import FormInput from '~/Component/FormInput';
import TouchableView from '~/Component/TouchableView';
import Text from '~./Component/Text';
import styles from './styles';

const submit = values => {
  console.log('submitting form', values);
};

const LoginForm = ({ onLogin, onNavigate, handleSubmit }) =>
  <KeyboardAvoidingView
    onLogin={handleSubmit(onLogin)}
    onNavigate={handleSubmit(onNavigate)}
    style={styles.container}
    behavior={'position'}
  >
    <View style={styles.imageContainer}>
      <Image style={styles.image} source={Images.imgDefault250} />
    </View>
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
    <View style={styles.buttonContainer}>
      <TouchableView onPress={handleSubmit(submit)} style={styles.submitButton}>
        <Text style={styles.buttonText}>LOGIN</Text>
      </TouchableView>
    </View>
    <View>
      <TouchableView onPress={onNavigate}>
        <Text style={styles.footerText}>Forgot your password.</Text>
        <Text style={styles.signUpText}>
          {"Don't have an account. Register"}
        </Text>
      </TouchableView>
    </View>
  </KeyboardAvoidingView>;

LoginForm.defaultProps = {
  error: null,
};

LoginForm.propTypes = {
  onLogin: PropTypes.func,
  onNavigate: PropTypes.func,
  handleSubmit: PropTypes.func,
  reset: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  invalid: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

LoginForm = reduxForm({
  form: 'login',
})(LoginForm);

class LoginScene extends Component {
  submit = values => {
    console.log(values);
    this.props.setLoggedIn();
  };

  render() {
    return (
      <LoginForm
        onLogin={this.submit}
        onNavigate={this.props.navigateForgotPassword}
      />
    );
  }
}

LoginScene.propTypes = {
  login: PropTypes.object,
  setLoggedIn: PropTypes.func,
  navigateForgotPassword: PropTypes.func,
};

const mapStateToProps = state => ({
  login: state[KEY],
});

const mapDispatchToProps = dispatch => ({
  setLoggedIn: bindActionCreators(setLoggedIn, dispatch),
  navigateForgotPassword: () =>
    dispatch(NavigationActions.navigate({ routeName: 'forgot' })),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScene);
