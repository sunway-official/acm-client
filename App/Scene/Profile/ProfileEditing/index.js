import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { gql, graphql, compose } from 'react-apollo';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  ActivityIndicator,
} from 'react-native';
import moment from 'moment';
import mutation from '~/Graphql/mutation/updateMe.graphql';
import query from '~/Graphql/query/me.graphql';
import { NavigationActions } from '~/Redux/Navigation';
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
    navigate: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
    };

    this._onUpdate = this._onUpdate.bind(this);
    this._getMe = this._getMe.bind(this);
  }

  componentDidMount() {
    this.setState({ loading: false });
  }

  async _onUpdate(values) {
    const { mutate, data: { refetch, me }, navigate } = this.props;
    this.setState({ loading: true });
    try {
      await mutate({
        variables: {
          ...values,
          gender: values.gender.value,
          dob: moment(values.dob).toISOString(),
        },
      });
      await refetch();
      // console.log('res: ', res.data.me);
      // navigate('profile');
      // console.log('me: ', me);
    } catch (err) {
      console.log(err);
    }
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
    console.log('get me: ', this.props);
    return (
      <View>
        {this.state.loading
          ? <View style={styles.mutationLoading}>
              <ActivityIndicator color="#2c3e50" />
            </View>
          : null}
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
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  navigate: routeName => dispatch(NavigationActions.navigate({ routeName })),
});

const Scene = compose(
  graphql(gql(mutation)),
  graphql(gql(query)),
  connect(undefined, mapDispatchToProps),
)(ProfileEditing);

export default Scene;
