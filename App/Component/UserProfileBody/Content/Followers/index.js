import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { graphql, gql, compose } from 'react-apollo';
import { NavigationActions } from 'Reduck/Navigation';
import { View, TouchableOpacity } from 'react-native';
import { LoadingIndicator } from 'Component';
import QUERY_ME from 'Graphql/query/me.graphql';
import Item from './Item';
import styles from './styles';

class Follower extends Component {
  static propTypes = {
    navigate: PropTypes.func,
    tabContent: PropTypes.object,
    queryMe: PropTypes.object,
    enableFollowUser: PropTypes.bool,
  };

  constructor(props) {
    super(props);

    this.state = {
      follow: false,
    };

    this._navigateToAttendeeProfile = this._navigateToAttendeeProfile.bind(
      this,
    );
  }

  _navigateToAttendeeProfile(followerId) {
    const { queryMe, navigate } = this.props;
    if (followerId === queryMe.me.id) {
      navigate('profile');
    } else {
      navigate('people', followerId);
    }
  }

  render() {
    const { tabContent: { getFollowers }, enableFollowUser } = this.props;
    return (
      <View style={styles.container}>
        {!getFollowers ? (
          <LoadingIndicator />
        ) : (
          getFollowers.map((follower, index) => (
            <Item
              key={index}
              follower={follower}
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
  navigate: (routeName, followerId) =>
    dispatch(
      NavigationActions.navigate({
        routeName,
        params: { userId: followerId },
      }),
    ),
});

export default compose(
  connect(undefined, mapDispatchToProps),
  graphql(gql(QUERY_ME), {
    name: 'queryMe',
  }),
)(Follower);
