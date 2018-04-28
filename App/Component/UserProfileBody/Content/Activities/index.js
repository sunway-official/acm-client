import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, FlatList } from 'react-native';
import { News, LoadingIndicator, EmptyCollection } from 'Component';
import styles from './styles';

const NETWORK_STATUS_LOADING = 1;
const NETWORK_STATUS_REFETCHING = 4;
class Activities extends Component {
  constructor(props) {
    super(props);

    this.onRefresh = this.onRefresh.bind(this);
  }

  onRefresh() {
    this.props.tabContent.refetch();
  }

  _renderLoading() {
    return (
      <View style={styles.loadingContainer}>
        <LoadingIndicator />
      </View>
    );
  }

  _renderDataList() {
    const {
      tabContent: { getNewsByUserID },
      networkStatus,
      userQuery: { getUserByID },
    } = this.props;

    return (
      <FlatList
        data={getNewsByUserID}
        renderItem={({ item, index }) => (
          <News
            item={item}
            key={index}
            userId={getUserByID.id}
            onRefresh={this.onRefresh}
            avatar={getUserByID.avatar}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
        onRefresh={this.onRefresh}
        refreshing={networkStatus === NETWORK_STATUS_REFETCHING}
      />
    );
  }

  render() {
    const { tabContent: { getNewsByUserID }, networkStatus } = this.props;
    if (networkStatus === NETWORK_STATUS_LOADING) {
      return <View>{this._renderLoading()}</View>;
    }
    return getNewsByUserID.length > 0 ? (
      <View>{this._renderDataList()}</View>
    ) : (
      <EmptyCollection customStyles={styles.emptyContainer} />
    );
  }
}

Activities.propTypes = {
  networkStatus: PropTypes.number,
  userQuery: PropTypes.object,
  tabContent: PropTypes.object,
};

export default Activities;
