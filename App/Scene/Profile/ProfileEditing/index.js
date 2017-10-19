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
import mutation from '~/Graphql/mutation/updateMe.graphql';
import query from '~/Graphql/query/me.graphql';
import { NavigationActions } from '~/Redux/Navigation';
import { transformServerDate } from '~/Transformer';
import { DATE_FORMAT } from '~/env';
import styles from './styles';
import Form from './Form';
import { DEFAULT_ME } from '../fixture';

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
    this.setState({
      loading: false,
    });
  }

  async _onUpdate(values) {
    const { mutate, data: { refetch }, navigate } = this.props;
    this.setState({
      loading: true,
    });
    try {
      await mutate({
        variables: {
          ...values,
          gender: values.gender.value,
          dob: transformServerDate.toUTC(values.dob, DATE_FORMAT),
        },
      });
      await refetch();
      navigate('profile');
    } catch (err) {
      console.log(err);
    } finally {
      this.setState({
        loading: false,
      });
    }
  }

  _getMe(loading, me) {
    return loading
      ? DEFAULT_ME
      : {
          firstname: me.firstname,
          lastname: me.lastname,
          dob: transformServerDate.toLocal(me.dob || '1990-01-01'),
          gender: {
            name: me.gender.charAt(0).toUpperCase() + me.gender.slice(1),
            value: me.gender,
          },
          interested_in: me.interested_in,
          bio: me.bio,
          organization: me.organization,
          position: me.position,
          language: me.language,
          facebook_id: me.facebook_id,
          twitter_id: me.twitter_id,
          linkedin_id: me.linkedin_id,
        };
  }

  render() {
    const { data: { me, loading } } = this.props;
    return (
      <View>
        {' '}
        {this.state.loading ? (
          <View style={styles.mutationLoading}>
            <ActivityIndicator color="#2c3e50" />
          </View>
        ) : null}{' '}
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
  navigate: routeName =>
    dispatch(
      NavigationActions.navigate({
        routeName,
      }),
    ),
});

const Scene = compose(
  graphql(gql(mutation)),
  graphql(gql(query)),
  connect(undefined, mapDispatchToProps),
)(ProfileEditing);

export default Scene;
