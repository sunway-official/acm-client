import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql, gql, compose } from 'react-apollo';
import { UserProfileBody, LoadingIndicator } from 'Component';
import QUERY_ACTIVITIES from 'Graphql/query/getNewsByUserID.graphql';
import QUERY_FOLLOWERS from 'Graphql/query/getFollowers.graphql';
import QUERY_FOLLOWINGS from 'Graphql/query/getFollowings.graphql';

class Body extends Component {
  static propTypes = {
    userQuery: PropTypes.object,
    getActivitiesQuery: PropTypes.object,
    getFollowersQuery: PropTypes.object,
    getFollowingsQuery: PropTypes.object,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const {
      userQuery,
      getActivitiesQuery,
      getFollowersQuery,
      getFollowingsQuery,
    } = this.props;

    return userQuery.loading ||
      getActivitiesQuery.loading ||
      getFollowersQuery.loading ||
      getFollowingsQuery.loading ? (
      <LoadingIndicator />
    ) : (
      <UserProfileBody
        userQuery={userQuery}
        activitiesQuery={getActivitiesQuery}
        followersQuery={getFollowersQuery}
        followingsQuery={getFollowingsQuery}
        enableFollowUser
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
  graphql(gql(QUERY_FOLLOWINGS), {
    name: 'getFollowingsQuery',
  }),
)(Body);
