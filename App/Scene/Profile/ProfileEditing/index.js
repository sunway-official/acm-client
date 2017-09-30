import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { gql, graphql, compose } from 'react-apollo';
import { View, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import mutation from '~/Graphql/mutation/updateMe.graphql';
import styles from './styles';
import Form from './Form';

class ProfileEditing extends Component {
  static propTypes = {
    mutate: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this._onUpdate = this._onUpdate.bind(this);
  }

  async _onUpdate(values) {
    const { mutate } = this.props;
    await mutate({
      variables: { ...values, dob: '1996-11-18T00:00:00.000Z' },
    });
    console.log(values);
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Form onUpdate={this._onUpdate} />
      </ScrollView>
    );
  }
}

const Scene = graphql(gql(mutation))(ProfileEditing);

Scene.drawer = {
  primary: true,
};

export default Scene;
