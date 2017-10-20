import React, { Component } from 'react';
import { View, BackHandler } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavigationActions } from '~/Redux/Navigation';
import AppNavigation from '~/Navigation';
import { getInitialRoute } from '~/Navigation/resolver';
import { gql, compose, withApollo } from 'react-apollo';
import { LocalNotification } from '~/Notification';
import query from '~/Graphql/query/me.graphql';
import styles from './styles';

class Root extends Component {
  static propTypes = {
    back: PropTypes.func,
    login: PropTypes.func,
    setUser: PropTypes.func,
    navigateToInitialRoute: PropTypes.func,
    client: PropTypes.object,
    data: PropTypes.shape({
      me: PropTypes.object,
      error: PropTypes.any,
    }),
  };

  async componentWillMount() {
    const { client } = this.props;
    try {
      await client.query({ query: gql(query) });
      this.props.navigateToInitialRoute();
    } catch (error) {
      this.props.login();
    }
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.props.back);
  }

  render() {
    return (
      <View style={styles.container}>
        <LocalNotification />
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
