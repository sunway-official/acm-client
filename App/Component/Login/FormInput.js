import React from 'react';
import PropTypes from 'prop-types';
import { Text, TextInput, View } from 'react-native';

import styles from './styles';

const FormInput = ({ label, input, ...custom }) => (
  <View>
    <Text>{label}</Text>
    <TextInput style={styles.textInput} {...input} {...custom} />
  </View>
);

FormInput.propTypes = {
  label: PropTypes.string,
  input: PropTypes.object,
};

export default FormInput;
