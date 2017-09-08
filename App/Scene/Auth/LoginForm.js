import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Field, reduxForm } from 'redux-form';
import { required, email, password } from '~/Lib/validate';
import { KEY, setLoggedIn } from '~/Redux/Login';

import { KeyboardAvoidingView, Image, View } from 'react-native';
import { Images } from '~/Theme';
import FormInput from '~/Component/FormInput';
import TouchableView from '~/Component/TouchableView';
import Text from '~./Component/Text';
import styles from './styles';

const submit = values => {
  console.log('submitting form', values);
};

const LoginForm = ({ handleSubmit }) =>
  <KeyboardAvoidingView
    onSubmit={handleSubmit}
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
      <TouchableView onPress={handleSubmit(submit)} style={styles.loginButton}>
        <Text style={styles.buttonText}>LOGIN</Text>
      </TouchableView>
    </View>
    <Text style={styles.footerText}>Forgot password?</Text>
  </KeyboardAvoidingView>;

LoginForm.defaultProps = {
  error: null,
};

LoginForm.propTypes = {
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
    console.log(this.props.navigation);
  };

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
    return <LoginForm onSubmit={this.submit} />;
  }
}

LoginScene.propTypes = {
  login: PropTypes.object,
  setLoggedIn: PropTypes.func,
  navigation: PropTypes.object,
};

const mapStateToProps = state => ({
  login: state[KEY],
});

const mapDispatchToProps = dispatch => {
  return {
    setLoggedIn: bindActionCreators(setLoggedIn, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScene);
