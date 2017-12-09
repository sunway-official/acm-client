import React from 'react';
import PropTypes from 'prop-types';
import { View, TextInput, ViewPropTypes } from 'react-native';
import Text from '../Text';
import { Colors } from '~/Theme';
import styles from './styles';

const changeUnderlineColor = ({ touched, error, warning }) => {
  if (touched) {
    if (error) return Colors.danger;
    if (warning) return Colors.warning;
  }
  return Colors.lightGrey;
};

const FormInput = ({
  input,
  meta: { touched, error, warning },
  containerStyle,
  customStyle,
  ...others
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <TextInput
        {...input}
        style={[
          styles.inputForm,
          {
            borderBottomColor: changeUnderlineColor({
              touched,
              error,
              warning,
            }),
          },
          customStyle,
        ]}
        underlineColorAndroid="transparent"
        {...others}
      />
      {touched &&
        ((error && <Text style={styles.errorText}>{error}</Text>) ||
          (warning && <Text style={styles.warningText}>{warning}</Text>))}
    </View>
  );
};

FormInput.propTypes = {
  input: PropTypes.object,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
    warning: PropTypes.string,
  }),
  containerStyle: ViewPropTypes.style,
  customStyle: ViewPropTypes.style,
};

export default FormInput;
