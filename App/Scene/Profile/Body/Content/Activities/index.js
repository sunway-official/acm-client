import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, FlatList } from 'react-native';
import { News, LoadingIndicator, EmptyCollection } from '~/Component';
import { gql, graphql } from 'react-apollo';
import QUERY_ACTIVITIES from '~/Graphql/query/getNewsByUserID.graphql';
import styles from './styles';

class Activities extends Component {
  constructor(props) {
    super(props);

    this.onRefresh = this.onRefresh.bind(this);
  }

  onRefresh() {
    this.props.refetch();
  }

  _renderLoading() {
    return (
      <View style={styles.loadingContainer}>
        <LoadingIndicator />
      </View>
    );
  }

  _renderDataList() {
    const { allNews, networkStatus, user } = this.props;

    return (
      <FlatList
        data={allNews}
        renderItem={({ item, index }) => (
          <News
            item={item}
            key={index}
            userId={user.id}
            onRefresh={this.onRefresh}
            avatar={user.avatar}
          />
        )}
        keyExtractor={(item, index) => index}
        onRefresh={this.onRefresh}
        refreshing={networkStatus === 4}
      />
    );
  }

  render() {
    const { allNews, networkStatus } = this.props;
    if (networkStatus === 1) return <View>{this._renderLoading()}</View>;
    return allNews.length > 0 ? (
      <View>{this._renderDataList()}</View>
    ) : (
      <EmptyCollection customStyles={styles.emptyContainer} />
    );
  }
}

Activities.propTypes = {
  allNews: PropTypes.array,
  refetch: PropTypes.func,
  networkStatus: PropTypes.number,
  user: PropTypes.object,
};

const ActivitiesWithQuery = graphql(gql(QUERY_ACTIVITIES), {
  options: ownProps => ({
    variables: { user_id: ownProps.user.id },
    notifyOnNetworkStatusChange: true,
  }),
  props: ({ data: { getNewsByUserID, refetch, networkStatus } }) => ({
    allNews: getNewsByUserID,
    refetch,
    networkStatus,
  }),
})(Activities);

export default ActivitiesWithQuery;
