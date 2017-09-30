import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Text, TextInput, View } from 'react-native';

import styles from './styles';
import { Colors } from '~/Theme';

class FormInput extends PureComponent {
  static propTypes = {
    input: PropTypes.object,
    meta: PropTypes.shape({
      touched: PropTypes.bool,
      error: PropTypes.string,
      warning: PropTypes.string,
    }),
    containerStyle: View.propTypes.style,
  };

  render() {
    const {
      input,
      containerStyle,
      meta: { touched, error, warning },
      ...custom
    } = this.props;

    const defaultUnderline = { borderColor: Colors.lightGrey };
    const errorUnderline = error
      ? { borderColor: Colors.danger }
      : defaultUnderline;
    const warningUnderline = warning
      ? {
          borderColor: Colors.warning,
        }
      : defaultUnderline;

    return (
      <View style={[containerStyle]}>
        <TextInput style={[styles.textInput]} {...input} {...custom} />
        {!touched && <Text style={[styles.defaultText, defaultUnderline]} />}
        {touched &&
          ((error &&
            <Text style={[styles.errorText, errorUnderline]}>
              {error}
            </Text>) ||
            (warning &&
              <Text style={[styles.warningText, warningUnderline]}>
                {warning}
              </Text>))}
      </View>
    );
  }
}

export default FormInput;
