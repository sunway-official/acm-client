import React, { Component } from 'react';
import { View, BackHandler } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavigationActions } from '~/Redux/Navigation';
import { setUser } from '~/Redux/Authentication';
import AppNavigation from '~/Navigation';
import { getInitialRoute } from '~/Navigation/resolver';
import { gql, compose, withApollo } from 'react-apollo';

import styles from './styles';

import query from '~/Graphql/query/me.graphql';

class Root extends Component {
  static propTypes = {
    back: PropTypes.func,
    client: PropTypes.object,
    login: PropTypes.func,
    setUser: PropTypes.func,
    navigateToInitialRoute: PropTypes.func,
    client: PropTypes.object,
    data: PropTypes.shape({
      me: PropTypes.object,
      error: PropTypes.any,
    }),
  };

  async componentDidMount() {
    const { client } = this.props;
    BackHandler.addEventListener('hardwareBackPress', this.props.back);
    try {
      await client.query({ query: gql(query) });
      this.props.navigateToInitialRoute();
    } catch (error) {
      this.props.login();
      console.log(error);
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
    login: () => dispatch(NavigationActions.reset({ routeName: 'login' })),
    navigateToInitialRoute: () =>
      dispatch(NavigationActions.reset({ routeName: getInitialRoute() })),
    setUser: user => dispatch(setUser(user)),
  };
};

export default compose(connect(undefined, mapDispatchToProps), withApollo)(
  Root,
);
