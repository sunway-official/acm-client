import React from 'react';
import PropTypes from 'prop-types';
import { Text, TextInput, View } from 'react-native';

import styles from './styles';

const FormInput = ({ input, meta: { touched, error, warning }, ...custom }) => (
  <View>
    <TextInput style={styles.textInput} {...input} {...custom} />
    {touched &&
      ((error && <Text style={styles.errorText}>{error}</Text>) ||
        (warning && <Text style={styles.warningText}>{warning}</Text>))}
  </View>
);

FormInput.propTypes = {
  input: PropTypes.object,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
    warning: PropTypes.string,
  }),
};

export default FormInput;
