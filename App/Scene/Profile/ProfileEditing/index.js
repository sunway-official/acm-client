import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { gql, graphql } from 'react-apollo';
import { ScrollView } from 'react-native';
import moment from 'moment';
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
      variables: { ...values, dob: moment(values.dob).toISOString() },
    });
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
