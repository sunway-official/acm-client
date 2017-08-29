import React from 'react';
import { Text, View } from 'react-native';
import { Field, reduxForm } from 'redux-form';

let LoginForm = props => {
  const { handleSubmit } = props;
  return (
    <View onSubmit={handleSubmit}>
      <Text>This is login form</Text>
    </View>
  );
};

LoginForm = reduxForm({
  form: 'login',
})(LoginForm);

export default LoginForm;
