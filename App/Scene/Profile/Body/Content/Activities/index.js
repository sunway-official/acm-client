import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, FlatList } from 'react-native';
import { News, LoadingIndicator } from '~/Component';

import { gql, graphql } from 'react-apollo';
import QUERY_ACTIVITIES from '~/Graphql/query/getNewsByUserID.graphql';

class Activities extends Component {
  constructor(props) {
    super(props);

    this.onRefresh = this.onRefresh.bind(this);
  }

  onRefresh() {
    this.props.refetch();
  }

  render() {
    const { allNews, networkStatus, user } = this.props;

    if (networkStatus === 1) {
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
  user: PropTypes.object,
};

const ActivitiesWithQuery = graphql(gql(QUERY_ACTIVITIES), {
  options: ownProps => ({ variables: { user_id: ownProps.user.id } }),
  props: ({ data: { getNewsByUserID, refetch, networkStatus } }) => ({
    allNews: getNewsByUserID,
    refetch,
    networkStatus,
  }),
  options: {
    notifyOnNetworkStatusChange: true,
  },
})(Activities);

export default ActivitiesWithQuery;
