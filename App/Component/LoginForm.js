import React from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';

let LoginForm = props => {
  const { handleSubmit } = props;
  return (
    <View onSubmit={handleSubmit}>
      <Text>This is login form</Text>
    </View>
  );
};

LoginForm.propTypes = {
  handleSubmit: PropTypes.func,
};

LoginForm = reduxForm({
  form: 'login',
})(LoginForm);

export default LoginForm;
