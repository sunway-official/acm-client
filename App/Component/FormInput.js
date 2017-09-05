import React from 'react';
import PropTypes from 'prop-types';
import { Text, TextInput, View, StyleSheet } from 'react-native';
import { Colors, Fonts } from '../Theme/';

const styles = StyleSheet.create({
  textInput: {
    height: 48,
    borderBottomWidth: 1,
    borderColor: Colors.lightGrey,
  },
  warningText: {
    color: Colors.warning,
    fontSize: Fonts.size.small,
    borderTopWidth: 1,
    borderColor: Colors.warning,
    paddingTop: 5,
  },
  errorText: {
    color: Colors.danger,
    fontSize: Fonts.size.small,
    borderTopWidth: 1,
    borderColor: Colors.danger,
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
