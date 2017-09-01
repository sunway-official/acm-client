import React from 'react';
import PropTypes from 'prop-types';
import { Text, TextInput, View } from 'react-native';

import styles from './styles';

const FormInput = ({
  label,
  input,
  meta: { touched, error, warning },
  ...custom
}) => (
  <View>
    <Text>{label}</Text>
    <TextInput style={styles.textInput} {...input} {...custom} />
    {touched &&
      ((error && <Text>{error}</Text>) || (warning && <Text>{warning}</Text>))}
  </View>
);

FormInput.propTypes = {
  label: PropTypes.string,
  input: PropTypes.object,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
    warning: PropTypes.string,
  }),
};

export default FormInput;
