import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, FlatList } from 'react-native';
import { News, LoadingIndicator } from '~/Component';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import ACTIVITIES_QUERY from '~/Graphql/query/getNewsByUserID.graphql';

class Activities extends Component {
  constructor(props) {
    super(props);

    this.onRefresh = this.onRefresh.bind(this);
  }

  onRefresh() {
    this.props.refetch();
  }

  render() {
    const { loading, allNews, networkStatus, user } = this.props;

    if (loading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <LoadingIndicator />
        </View>
      );
    }

    return (
      <View>
        <FlatList
          data={allNews}
          renderItem={({ item, index }) => (
            <News
              item={item}
              key={index}
              userId={user.id}
              onRefresh={this.onRefresh}
            />
          )}
          keyExtractor={(item, index) => index}
          onRefresh={this.onRefresh}
          refreshing={networkStatus === 4}
        />
      </View>
    );
  }
}

Activities.propTypes = {
  loading: PropTypes.bool.isRequired,
  allNews: PropTypes.array,
  refetch: PropTypes.func,
  networkStatus: PropTypes.number,
  error: PropTypes.object,
  user: PropTypes.object,
};

const ActivitiesWithQuery = graphql(gql(ACTIVITIES_QUERY), {
  options: ownProps => ({ variables: { user_id: ownProps.user.id } }),
  props: ({
    data: { loading, getNewsByUserID, refetch, networkStatus, error },
  }) => ({
    loading,
    allNews: getNewsByUserID,
    refetch,
    networkStatus,
    error,
  }),
})(Activities);

export default ActivitiesWithQuery;
