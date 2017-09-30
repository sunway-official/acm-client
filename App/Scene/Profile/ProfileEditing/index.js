import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { gql, graphql, compose } from 'react-apollo';
import { View, ScrollView } from 'react-native';
// import { Icon } from 'react-native-elements';
import { Field, reduxForm } from 'redux-form';
import { required } from '~/Lib/validate';
import { Text, FormInput, TouchableView } from '~/Component';
import mutation from '~/Graphql/mutation/updateMe.graphql';
// import DatePicker from 'react-native-datepicker';

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
  // bio: {
  //   title: 'Biographical',
  //   field: {
  //     name: 'bio',
  //     props: {
  //       placeholder: 'bio',
  //     },
  //   },
  // },
  // language: {
  //   title: 'Language',
  //   field: {
  //     name: 'language',
  //     props: {
  //       placeholder: 'language',
  //     },
  //   },
  // },
  // linkedin_id: {
  //   title: 'Linkedin',
  //   field: {
  //     name: 'linkedin_id',
  //     props: {
  //       placeholder: 'linkedin',
  //     },
  //   },
  // },
  // facebook_id: {
  //   title: 'Facebook',
  //   field: {
  //     name: 'facebook_id',
  //     props: {
  //       placeholder: 'facebook',
  //     },
  //   },
  // },
  // twitter_id: {
  //   title: 'Twitter',
  //   field: {
  //     name: 'twitter_id',
  //     props: {
  //       placeholder: 'twitter',
  //     },
  //   },
  // },
};

class ProfileEditing extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func,
    mutate: PropTypes.func,
  };

  constructor(props) {
    super(props);

    // this.state = {
    //   date: '1996-11-18',
    // };

    this._renderInputForms = this._renderInputForms.bind(this);
    this._renderSubmitButton = this._renderSubmitButton.bind(this);
    this._submit = this._submit.bind(this);
  }

  // _renderDatePicker() {
  //   <DatePicker
  //     style={{ width: 200 }}
  //     date={this.state.date}
  //     mode="date"
  //     placeholder="Select date"
  //     format="YYYY-MM-DD"
  //     minDate="1986-01-01"
  //     maxDate="2017-09-30"
  //     confirmBtnText="Confirm"
  //     cancelBtnText="Cancel"
  //     customStyles={{
  //       dateIcon: {
  //         position: 'absolute',
  //         left: 0,
  //         top: 4,
  //         marginLeft: 0,
  //       },
  //       dateInput: {
  //         marginLeft: 36,
  //       },
  //     }}
  //     onDateChange={date => {
  //       this.setState({ date: date });
  //     }}
  //   />;
  // }

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

  async _submit(values) {
    const { mutate } = this.props;
    const now = new Date('18 November 1996 UTC');
    values.dob = now.toISOString();
    await mutate({ variables: values });
    console.log(values);
  }

  _renderSubmitButton() {
    const { _submit, props: { handleSubmit } } = this;
    return (
      <TouchableView
        rippleColor="green"
        style={{ backgroundColor: 'pink' }}
        onPress={handleSubmit(_submit)}
      >
        <Text>Update</Text>
      </TouchableView>
    );
  }

  render() {
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
          {this._renderSubmitButton()}
        </View>
      </ScrollView>
    );
  }
}

export default compose(
  reduxForm({
    form: 'userProfile',
  }),
  graphql(gql(mutation)),
)(ProfileEditing);
