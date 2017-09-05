import React from 'react';
import PropTypes from 'prop-types';
import { Text, TextInput, View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  textInput: {
    height: 48,
    borderBottomWidth: 1,
    borderColor: '#ECF0F3',
  },
  warningText: {
    color: 'orange',
    fontSize: 12,
    borderTopWidth: 1,
    borderColor: 'orange',
    paddingTop: 5,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    borderTopWidth: 1,
    borderColor: '#dc4405',
    paddingTop: 5,
  },
});

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
