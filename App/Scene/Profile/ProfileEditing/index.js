import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { gql, graphql, compose } from 'react-apollo';
import { View, ScrollView, KeyboardAvoidingView, Keyboard } from 'react-native';
import UPDATE_ME from 'Graphql/mutation/updateMe.graphql';
import QUERY_ME from 'Graphql/query/me.graphql';
import { LoadingIndicator } from 'Component';
import { NavigationActions } from 'Reduck/Navigation';
import { transformServerDate } from 'Transformer';
import { DATE_FORMAT } from 'env';
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

  componentWillUnmount() {
    Keyboard.dismiss();
  }

  async _onUpdate(values) {
    const { mutate, data: { refetch }, navigate } = this.props;

    this.setState({ loading: true });
    Keyboard.dismiss();

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
      this.setState({ loading: false });
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
        {this.state.loading ? (
          <View style={styles.mutationLoading}>
            <LoadingIndicator />
          </View>
        ) : null}
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
  graphql(gql(UPDATE_ME)),
  graphql(gql(QUERY_ME)),
  connect(undefined, mapDispatchToProps),
)(ProfileEditing);

Scene.header = {
  leftIcon: 'back',
};

Scene.drawer = {
  disableGestures: true,
};

export default Scene;
