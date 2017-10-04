import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Image } from 'react-native';
import { Badge, Icon } from 'react-native-elements';
import { Field, reduxForm } from 'redux-form';
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

    this._renderSubmitBtn = this._renderSubmitBtn.bind(this);
  }

  _renderForms(form, key, titleOption = true) {
    return (
      <View key={key} style={styles.inputContainer}>
        {titleOption
          ? <Text>
              {form.title}
            </Text>
          : null}
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
        <View style={{ flex: 1, flexDirection: 'row', marginBottom: 16 }}>
          <View>
            <Image
              source={{
                uri:
                  'https://s3.amazonaws.com/uifaces/faces/twitter/kfriedson/128.jpg',
              }}
              style={{ width: 120, height: 120, borderRadius: 120 / 2 }}
            />
            <Badge
              containerStyle={{
                backgroundColor: 'red',
                flex: 0,
                padding: 0,
              }}
            >
              <Icon name="camera" type="material-community" />
            </Badge>
          </View>
          <View style={{ flex: 1, marginLeft: 16 }}>
            {this._renderForms(fields['firstname'], 'firstname', false)}
            {this._renderForms(fields['lastname'], 'lastname', false)}
          </View>
        </View>
        {Object.keys(fields)
          .slice(2)
          .map(key => this._renderForms(fields[key], key))}
        {this._renderSubmitBtn()}
      </View>
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
