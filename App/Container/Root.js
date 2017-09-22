import React, { Component } from 'react';
import { View, BackHandler } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavigationActions } from '~/Redux/Navigation';
import { NavigationActions as ReactNavigationActions } from 'react-navigation';
import AppNavigation from '~/Navigation';
import { gql, compose, graphql } from 'react-apollo';

import styles from './styles';

import query from '~/Graphql/query/me.graphql';

class Root extends Component {
  static propTypes = {
    back: PropTypes.func,
    client: PropTypes.object,
    login: PropTypes.func,
    home: PropTypes.func,
    data: PropTypes.shape({
      error: PropTypes.any,
    }),
  };

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.props.back);
  }

  componentDidUpdate(prevProps) {
    const { data: { error } } = this.props;
    if (prevProps.data.error !== error && error) {
      this.props.login();
    } else {
      this.props.home();
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <AppNavigation />
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    back: () => dispatch(NavigationActions.back()),
    login: () =>
      dispatch(
        NavigationActions.reset({
          index: 0,
          actions: [ReactNavigationActions.navigate({ routeName: 'login' })],
        }),
      ),
    home: () =>
      dispatch(
        NavigationActions.reset({
          index: 0,
          actions: [ReactNavigationActions.navigate({ routeName: 'home' })],
        }),
      ),
  };
};

export default compose(
  connect(undefined, mapDispatchToProps),
  graphql(gql(query), {
    options: { notifyOnNetworkStatusChange: true },
  }),
)(Root);
