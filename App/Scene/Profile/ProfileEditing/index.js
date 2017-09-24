import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Field, reduxForm } from 'redux-form';
import { required, email, password } from '~/Lib/validate';
import { Text, FormInput } from '~/Component';

const inputForms = {
  firstname: {
    title: 'Firstname',
    field: {
      name: 'firstname',
      type: 'text',
      validate: [required],
      props: {
        placeholder: 'Firstname',
        underlineColorAndroid: 'transparent',
        keyboardType: 'default',
      },
    },
  },
  lastname: {
    title: 'Lastname',
    field: {
      name: 'lastname',
      type: 'text',
      validate: [required],
      props: {
        placeholder: 'Lastname',
        underlineColorAndroid: 'transparent',
        keyboardType: 'default',
      },
    },
  },
  email: {
    title: 'Email',
    field: {
      name: 'email',
      type: 'email',
      validate: [required, email],
      props: {
        placeholder: 'Email',
        underlineColorAndroid: 'transparent',
        keyboardType: 'default',
      },
    },
  },
};

class ProfileEditing extends Component {
  static propTypes = {};

  constructor(props) {
    super(props);
    this._renderInputForms = this._renderInputForms.bind(this);
  }

  _renderInputForms(form, key) {
    return (
      <View key={key} style={{ marginBottom: 16 }}>
        <Field component={FormInput} {...form.field} {...form.field.props} />
      </View>
    );
  }

  render() {
    return (
      <View
        style={{ flex: 1, margin: 8, backgroundColor: 'white', padding: 8 }}
      >
        {Object.keys(inputForms).map(key =>
          this._renderInputForms(inputForms[key], key),
        )}
      </View>
    );
  }
}

export default reduxForm({
  form: 'userProfile',
})(ProfileEditing);
