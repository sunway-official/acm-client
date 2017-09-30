import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView } from 'react-native';
import { Field, reduxForm } from 'redux-form';
import { Icon } from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import { Text, FormInput, TouchableView } from '~/Component';
import fields from '../fields';
import styles from './styles';

class UpdateProfileForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func,
    onUpdate: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this._renderSubmitButton = this._renderSubmitButton.bind(this);
  }

  _renderInputForms(form, key) {
    return (
      <View key={key} style={styles.inputContainer}>
        <Text>
          {form.title}
        </Text>
        <Field
          component={FormInput}
          underlineColorAndroid="transparent"
          keyboardType="default"
          {...form.field}
          {...form.field.props}
        />
      </View>
    );
  }

  _renderSubmitButton() {
    const { props: { handleSubmit, onUpdate } } = this;
    return (
      <TouchableView style={styles.submitBtn} onPress={handleSubmit(onUpdate)}>
        <Text bold style={styles.submitTitle}>
          {'Update'}
        </Text>
      </TouchableView>
    );
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.formContainer}>
          {Object.keys(fields).map(key =>
            this._renderInputForms(fields[key], key),
          )}
          {this._renderSubmitButton()}
        </View>
      </ScrollView>
    );
  }
}

const Form = reduxForm({
  form: 'userProfile',
})(UpdateProfileForm);

Form.drawer = {
  primary: true,
};

export default Form;
