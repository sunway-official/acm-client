import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

import {
  FormLabel,
  FormInput,
  FormValidationMessage,
} from 'react-native-elements';

const AppFormInput = ({
  name,
  label,
  value,
  error,
  touched,
  setValue,
  toggleTouched,
  ...rest
}) => (
  <View>
    {label && <FormLabel>{label}</FormLabel>}
    <FormInput
      name={name || undefined}
      value={value || ''}
      onChangeText={text => {
        if (setValue && toggleTouched) {
          setValue(name, text);
          toggleTouched(name);
        }
      }}
      onBlur={() => {
        if (toggleTouched) {
          toggleTouched(name, false);
        }
      }}
      {...rest}
    />
    {touched &&
      !!error && <FormValidationMessage>{error}</FormValidationMessage>}
  </View>
);

AppFormInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
  touched: PropTypes.bool,
  setValue: PropTypes.func,
  toggleTouched: PropTypes.func,
};

AppFormInput.defaultProps = {
  label: null,
  error: null,
  touched: false,
  setValue: null,
  toggleTouched: null,
};

export default AppFormInput;
