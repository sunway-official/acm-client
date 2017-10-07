import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { gql, graphql, compose } from 'react-apollo';
import { ScrollView, KeyboardAvoidingView } from 'react-native';
import moment from 'moment';
import mutation from '~/Graphql/mutation/updateMe.graphql';
import query from '~/Graphql/query/me.graphql';
import styles from './styles';
import Form from './Form';

class ProfileEditing extends Component {
  static propTypes = {
    data: PropTypes.shape({
      me: PropTypes.object,
      loading: PropTypes.bool,
      refetch: PropTypes.func,
    }),
    mutate: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this._onUpdate = this._onUpdate.bind(this);
    this._getMe = this._getMe.bind(this);
  }

  async _onUpdate(values) {
    const { mutate } = this.props;
    console.log(this.props);
    await mutate({
      variables: {
        ...values,
        gender: values.gender.value,
        dob: moment(values.dob).toISOString(),
      },
    });
  }

  _me(
    firstname = '',
    lastname = '',
    dob = moment().format('YYYY-MM-DD'),
    gender = { name: 'Male', value: 'male' },
  ) {
    return {
      firstname: firstname,
      lastname: lastname,
      dob: dob,
      gender: gender,
    };
  }

  _getMe(loading, me) {
    return loading
      ? this._me()
      : this._me(me.firstname, me.lastname, me.dob, {
          name: me.gender,
          value: me.gender,
        });
  }

  render() {
    const { data: { me, loading } } = this.props;
    return (
      <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={85}>
        <ScrollView style={styles.container}>
          <Form
            me={me}
            onUpdate={this._onUpdate}
            enableReinitialize
            initialValues={this._getMe(loading, me)}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const Scene = compose(graphql(gql(mutation)), graphql(gql(query)))(
  ProfileEditing,
);

export default Scene;
