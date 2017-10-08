import React from 'react';
import PropTypes from 'prop-types';
import { View, TextInput } from 'react-native';
import Text from '../Text';
import { Colors } from '../../Theme';
import styles from './styles';

const changeUnderlineColor = (touched, error) => {
  let borderBottomColor = '#ecf0f1';
  if (touched) {
    if (error) borderBottomColor = Colors.red;
    else borderBottomColor = Colors.warning;
  }
  return borderBottomColor;
};

const FormInputCustom = ({
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
          { borderBottomColor: changeUnderlineColor(touched, error) },
          customStyle,
        ]}
        underlineColorAndroid="transparent"
        {...others}
      />
      {touched &&
        ((error &&
          <Text style={styles.errorText}>
            {error}
          </Text>) ||
          (warning &&
            <Text style={styles.warningText}>
              {warning}
            </Text>))}
    </View>
  );
};

FormInputCustom.propTypes = {
  input: PropTypes.object,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
    warning: PropTypes.string,
  }),
  containerStyle: View.propTypes.style,
  customStyle: View.propTypes.style,
};

export default FormInputCustom;
