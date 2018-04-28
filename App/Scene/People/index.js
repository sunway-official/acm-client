import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { View, Button } from 'react-native';
import {
  Text,
  UserProfileBody,
  UserProfileHeader,
  LoadingIndicator,
} from 'Component';
import { connect } from 'react-redux';
import { compose, graphql, gql, withApollo } from 'react-apollo';
import { NavigationActions } from 'Reduck/Navigation';
import styles from './styles';
import USER_BY_ID_QUERY from 'Graphql/query/getUserByID.graphql';
import GET_NEWS_BY_USER_ID_QUERY from 'Graphql/query/getNewsByUserID.graphql';
import Content from './Content';

import { Colors } from 'Theme';

class PeopleScene extends Component {
  static propTypes = {
    navigation: PropTypes.object,
  };

  render() {
    const { navigation } = this.props;

    return navigation && <Content userId={navigation.state.params.userId} />;
  }
}

PeopleScene.header = {
  leftIcon: 'back',
  hideTitle: true,
  // float: true,
  theme: 'dark',
  backgroundColor: Colors.primary,
  statusBarBackgroundColor: Colors.primary,
};

PeopleScene.propTypes = {
  home: PropTypes.func,
};

export default PeopleScene;
