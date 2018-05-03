import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavigationActions } from 'Reduck/Navigation';
import { connect } from 'react-redux';
import { graphql, gql, compose } from 'react-apollo';
import { View, TouchableOpacity } from 'react-native';
import { LoadingIndicator } from 'Component';
import QUERY_ME from 'Graphql/query/me.graphql';
import Item from './Item';
import styles from './styles';

class Following extends Component {
  static propTypes = {
    tabContent: PropTypes.object,
    queryMe: PropTypes.object,
    navigate: PropTypes.func,
    enableFollowUser: PropTypes.bool,
  };

  constructor(props) {
    super(props);

    this._navigateToAttendeeProfile = this._navigateToAttendeeProfile.bind(
      this,
    );
  }

  componentWillUnmount() {
    this.props.tabContent.refetch();
  }

  _navigateToAttendeeProfile(followingId) {
    const { queryMe, navigate } = this.props;
    if (followingId === queryMe.me.id) {
      navigate('profile');
    } else {
      navigate('people', followingId);
    }
  }

  render() {
    const { tabContent: { getFollowings }, enableFollowUser } = this.props;
    return (
      <View style={styles.container}>
        {!getFollowings ? (
          <LoadingIndicator />
        ) : (
          getFollowings.map((following, index) => (
            <Item
              key={index}
              following={following}
              navigateToProfile={id => this._navigateToAttendeeProfile(id)}
              enableFollowUser={enableFollowUser}
            />
          ))
        )}
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  navigate: (routeName, followingId) =>
    dispatch(
      NavigationActions.navigate({
        routeName,
        params: { userId: followingId },
      }),
    ),
});

export default compose(
  connect(undefined, mapDispatchToProps),
  graphql(gql(QUERY_ME), {
    name: 'queryMe',
  }),
)(Following);
