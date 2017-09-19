import React, { Component } from 'react';
import { View, BackHandler } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavigationActions } from '~/Redux/Navigation';
import AppNavigation from '~/Navigation';
import { gql, compose, graphql } from 'react-apollo';

import styles from './styles';

import query from '~/Graphql/query/me.graphql';

class Root extends Component {
  static propTypes = {
    navigateBack: PropTypes.func,
    client: PropTypes.object,
    login: PropTypes.func,
    data: PropTypes.shape({
      error: PropTypes.any,
    }),
  };

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.props.navigateBack);
  }

  componentDidUpdate() {
    const { data: { error } } = this.props;
    if (error) {
      this.props.login();
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
    navigateBack: () => dispatch(NavigationActions.back()),
    login: () => dispatch(NavigationActions.navigate({ routeName: 'login' })),
  };
};

export default compose(
  connect(undefined, mapDispatchToProps),
  graphql(gql(query)),
)(Root);
