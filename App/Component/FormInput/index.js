import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Text, TextInput, View } from 'react-native';

import styles from './styles';

class FormInput extends PureComponent {
  static propTypes = {
    input: PropTypes.object,
    meta: PropTypes.shape({
      touched: PropTypes.bool,
      error: PropTypes.string,
      warning: PropTypes.string,
    }),
  };

  render() {
    const { input, meta: { touched, error, warning }, ...custom } = this.props;

    return (
      <View>
        <TextInput style={styles.textInput} {...input} {...custom} />
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
  }
}

export default FormInput;
