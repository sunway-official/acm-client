import React, { Component } from 'react';
import { View, BackHandler } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavigationActions } from 'Reduck/Navigation';
import AppNavigation from 'Navigation';
import { getInitialRoute } from 'Navigation/resolver';
import { gql, compose, withApollo } from 'react-apollo';
import { LocalNotification } from 'Notification';
import QUERY_ME from 'Graphql/query/me.graphql';
import styles from './styles';

class Root extends Component {
  static propTypes = {
    back: PropTypes.func,
    login: PropTypes.func,
    setUser: PropTypes.func,
    navigateToInitialScene: PropTypes.func,
    navigateToConferencesList: PropTypes.func,
    client: PropTypes.object,
    data: PropTypes.shape({
      me: PropTypes.object,
      error: PropTypes.any,
    }),
  };

  async componentWillMount() {
    const { client } = this.props;
    try {
      // Fetch QUERY_ME for checking login status & current conference
      const { data: { me: { currentConference } } } = await client.query({
        query: gql(QUERY_ME),
      });
      if (currentConference === null) {
        this.props.navigateToConferencesList();
      } else {
        this.props.navigateToInitialScene();
      }
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
    navigateToInitialScene: () =>
      dispatch(NavigationActions.reset({ routeName: getInitialRoute() })),
    navigateToConferencesList: () =>
      dispatch(NavigationActions.reset({ routeName: 'conferenceList' })),
    setUser: user => dispatch(setUser(user)),
  };
};

export default compose(connect(undefined, mapDispatchToProps), withApollo)(
  Root,
);
