import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { graphql, gql, compose } from 'react-apollo';
import { UserProfileBody } from 'Component';
import QUERY_ACTIVITIES from 'Graphql/query/getNewsByUserID.graphql';
import QUERY_FOLLOWERS from 'Graphql/query/getFollowers.graphql';

class Body extends Component {
  static propTypes = {
    userQuery: PropTypes.object,
    getActivitiesQuery: PropTypes.shape({
      getNewsByUserID: PropTypes.array,
      loading: PropTypes.bool,
      refetch: PropTypes.func,
    }),
    getFollowersQuery: PropTypes.shape({
      getFollowers: PropTypes.array,
      loading: PropTypes.bool,
      refetch: PropTypes.func,
    }),
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { userQuery, getActivitiesQuery, getFollowersQuery } = this.props;

    return (
      <UserProfileBody
        userQuery={userQuery}
        activitiesQuery={getActivitiesQuery}
        followers={getFollowersQuery.getFollowers}
      />
    );
  }
}

export default compose(
  graphql(gql(QUERY_ACTIVITIES), {
    name: 'getActivitiesQuery',
    options: ({ userQuery: { getUserByID } }) => ({
      variables: {
        user_id: getUserByID.id,
        notifyOnNetworkStatusChange: true,
      },
    }),
  }),
  graphql(gql(QUERY_FOLLOWERS), {
    name: 'getFollowersQuery',
  }),
)(Body);
