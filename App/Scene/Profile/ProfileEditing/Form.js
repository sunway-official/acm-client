import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView } from 'react-native';
import { Field, reduxForm } from 'redux-form';
import { FormInput, TouchableView, Text } from '~/Component';

const inputForms = {
  firstname: {
    title: 'Firstname',
    field: {
      name: 'firstname',
      validate: [required],
      props: {
        placeholder: 'Firstname',
      },
    },
  },
  lastname: {
    title: 'Lastname',
    field: {
      name: 'lastname',
      validate: [required],
      props: {
        placeholder: 'Lastname',
      },
    },
  },
  dob: {
    title: 'Birthday',
    field: {
      name: 'dob',
      props: {
        placeholder: 'day of birth',
      },
    },
  },
  gender: {
    title: 'Gender',
    field: {
      name: 'gender',
      props: {
        placeholder: 'gender',
      },
    },
  },
  bio: {
    title: 'Biographical',
    field: {
      name: 'bio',
      props: {
        placeholder: 'bio',
      },
    },
  },
  language: {
    title: 'Language',
    field: {
      name: 'language',
      props: {
        placeholder: 'language',
      },
    },
  },
  linkedin_id: {
    title: 'Linkedin',
    field: {
      name: 'linkedin_id',
      props: {
        placeholder: 'linkedin',
      },
    },
  },
  facebook_id: {
    title: 'Facebook',
    field: {
      name: 'facebook_id',
      props: {
        placeholder: 'facebook',
      },
    },
  },
  twitter_id: {
    title: 'Twitter',
    field: {
      name: 'twitter_id',
      props: {
        placeholder: 'twitter',
      },
    },
  },
};

class Form extends Component {
  static propTypes = {
    update: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this._renderInputForms = this._renderInputForms.bind(this);
  }

  _renderInputForms(form, key) {
    return (
      <View key={key} style={{ marginBottom: 16 }}>
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

  render() {
    const { update } = this.props;
    return (
      <ScrollView
        style={{
          margin: 8,
          backgroundColor: 'white',
        }}
      >
        <View style={{ padding: 8 }}>
          {Object.keys(inputForms).map(key =>
            this._renderInputForms(inputForms[key], key),
          )}
          <TouchableView
            rippleColor="green"
            style={{ backgroundColor: 'pink' }}
            onPress={() => update}
          >
            <Text>Update</Text>
          </TouchableView>
        </View>
      </ScrollView>
    );
  }
}

export default Form;
