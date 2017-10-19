import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, FlatList } from 'react-native';
import { Icon } from 'react-native-elements';
import { News, AnimatableView } from '~/Component';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import ACTIVITIES_QUERY from '~/Graphql/query/getAllNewsByUserId.graphql';

class Activities extends Component {
  constructor(props) {
    super(props);

    this.onRefresh = this.onRefresh.bind(this);
  }

  onRefresh() {
    this.props.refetch();
  }

  render() {
    const { loading, allNews, networkStatus } = this.props;

    if (loading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <AnimatableView
            animation="rotate"
            duration={1000}
            iterationCount="infinite"
          >
            <Icon name="loop" />
          </AnimatableView>
        </View>
      );
    }

    return (
      <View>
        <FlatList
          data={allNews}
          renderItem={({ item, index }) => <News item={item} key={index} />}
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
};

const ActivitiesWithQuery = graphql(gql(ACTIVITIES_QUERY), {
  options: () => ({ variables: { user_id: 2 } }),
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
