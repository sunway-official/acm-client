import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { ScrollView } from 'react-native';
import {
  UserProfileBody,
  UserProfileHeader,
  LoadingIndicator,
} from 'Component';
import { compose, graphql, gql } from 'react-apollo';
import USER_BY_ID_QUERY from 'Graphql/query/getUserByID.graphql';
import GET_NEWS_BY_USER_ID_QUERY from 'Graphql/query/getNewsByUserID.graphql';
import GET_FOLLOWERS_BY_USER_ID from 'Graphql/query/getFollowers.graphql';
import GET_FOLLWINGS_BY_USER_ID from 'Graphql/query/getFollowings.graphql';

class Content extends Component {
  static propTypes = {
    userId: PropTypes.any,
    getUserByIDQuery: PropTypes.object,
    getNewsByUserIDQuery: PropTypes.object,
    getFollowersByUserIDQuery: PropTypes.object,
    getFollowingsByUserIDQuery: PropTypes.object,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const {
      getUserByIDQuery,
      getNewsByUserIDQuery,
      getFollowersByUserIDQuery,
      getFollowingsByUserIDQuery,
    } = this.props;

    return (
      <ScrollView
        scrollEventThrottle={16}
        onScroll={this._handleScrolling}
        contentContainerStyle={{
          flexGrow: 1,
        }}
        overScrollMode={'never'}
      >
        {getNewsByUserIDQuery.loading ||
        getUserByIDQuery.loading ||
        getFollowingsByUserIDQuery.loading ||
        getFollowersByUserIDQuery.loading ? (
          <LoadingIndicator />
        ) : (
          <Fragment>
            <UserProfileHeader userQuery={getUserByIDQuery} />
            <UserProfileBody
              userQuery={getUserByIDQuery}
              activitiesQuery={getNewsByUserIDQuery}
              enableReview
              followersQuery={getFollowersByUserIDQuery}
              followingsQuery={getFollowingsByUserIDQuery}
            />
          </Fragment>
        )}
      </ScrollView>
    );
  }
}
export default compose(
  graphql(gql(USER_BY_ID_QUERY), {
    name: 'getUserByIDQuery',
    options: ownProps => {
      return {
        variables: {
          userId: ownProps.userId,
        },
      };
    },
  }),
  graphql(gql(GET_NEWS_BY_USER_ID_QUERY), {
    name: 'getNewsByUserIDQuery',
    options: ownProps => ({
      variables: {
        user_id: ownProps.userId,
      },
    }),
  }),
  graphql(gql(GET_FOLLOWERS_BY_USER_ID), {
    name: 'getFollowersByUserIDQuery',
    options: ownProps => ({
      variables: {
        user_id: ownProps.userId,
      },
    }),
  }),
  graphql(gql(GET_FOLLWINGS_BY_USER_ID), {
    name: 'getFollowingsByUserIDQuery',
    options: ownProps => ({
      variables: {
        user_id: ownProps.userId,
      },
    }),
  }),
)(Content);
