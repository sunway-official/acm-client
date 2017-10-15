import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Icon } from 'react-native-elements';
import { Field, reduxForm } from 'redux-form';
import { Text, FormInputCustom, TouchableView } from '~/Component';
import fields from '../fields';
import styles from './styles';

class UpdateProfileForm extends Component {
  static propTypes = {
    me: PropTypes.object,
    handleSubmit: PropTypes.func,
    onUpdate: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this._renderSubmitBtn = this._renderSubmitBtn.bind(this);
  }

  _renderForms(form, key, titleOption = true) {
    return (
      <View key={key} style={styles.inputContainer}>
        {titleOption ? (
          <View style={styles.iconStyle}>
            <Icon size={18} {...form.icon} />
          </View>
        ) : null}
        <Field
          component={FormInputCustom}
          underlineColorAndroid="transparent"
          keyboardType="default"
          {...form.field}
          {...form.field.props}
          containerStyle={styles.fieldContainer}
        />
      </View>
    );
  }

  _renderSubmitBtn() {
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
      <View style={styles.formContainer}>
        {Object.keys(fields).map(key => this._renderForms(fields[key], key))}
        {this._renderSubmitBtn()}
      </View>
    );
  }
}

const Form = reduxForm({
  form: 'userProfile',
})(UpdateProfileForm);

export default Form;
