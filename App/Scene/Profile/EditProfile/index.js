import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { gql, graphql, compose } from 'react-apollo';
import { View, ScrollView } from 'react-native';
import { Field, reduxForm } from 'redux-form';
import { Text, FormInput, TouchableView } from '~/Component';
import mutation from '~/Graphql/mutation/updateMe.graphql';
import fields from './fields';
import styles from './styles';

class ProfileEditing extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func,
    mutate: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this._renderInputForms = this._renderInputForms.bind(this);
    this._renderSubmitButton = this._renderSubmitButton.bind(this);
    this._submit = this._submit.bind(this);
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

  async _submit(values) {
    const { mutate } = this.props;
    await mutate({ variables: values });
    console.log(values);
  }

  _renderSubmitButton() {
    const { _submit, props: { handleSubmit } } = this;
    return (
      <TouchableView style={styles.submitBtn} onPress={handleSubmit(_submit)}>
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

const Scene = compose(
  reduxForm({
    form: 'userProfile',
  }),
  graphql(gql(mutation)),
)(ProfileEditing);

Scene.header = {
  leftIcon: 'back',
};

Scene.drawer = {
  disableGestures: true,
};

export default Scene;
