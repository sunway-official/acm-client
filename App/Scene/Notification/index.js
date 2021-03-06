import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import {
  Text,
  EmptyCollection,
  LoadingIndicator,
  TouchableView,
} from 'Component';
import _ from 'lodash';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { FlatList } from 'react-native';
import { compose, gql, graphql } from 'react-apollo';
import { NavigationActions } from 'Reduck/Navigation';
import { Colors } from 'Theme';
import GET_NOTIFICATIONS from 'Graphql/query/getNotifications.graphql';
import MUTATION_MARK_ALL_NOTIFICATION_AS_READ from 'Graphql/mutation/markAllNotificationsAsRead.graphql';
import Item from './Item';
import styles from './styles';

const closeIcon = {
  type: 'material-community',
  name: 'check-all',
  color: Colors.black,
  size: 20,
};

class NotificationScene extends Component {
  constructor(props) {
    super(props);

    this.state = {
      refreshing: false,
    };

    this._onRefresh = this._onRefresh.bind(this);
    this._markAllAsRead = this._markAllAsRead.bind(this);
  }

  async _onRefresh() {
    this.setState({
      refreshing: true,
    });

    await this.props.data.refetch();

    this.setState({
      refreshing: false,
    });
  }

  async _markAllAsRead() {
    await this.props.markAllNotificationsAsReadMutation();
    await this._onRefresh();
  }

  _renderNotificationList() {
    const data = _.orderBy(
      this.props.data.getNotifications,
      'updated_at',
      'desc',
    );
    return (
      <FlatList
        data={data}
        renderItem={({ item, index }) => <Item key={index} {...item} />}
        keyExtractor={(item, index) => index.toString()}
        refreshing={this.state.refreshing}
        onRefresh={this._onRefresh}
      />
    );
  }

  _renderNotificationContainer() {
    return (
      <View style={styles.container}>
        <TouchableView style={styles.header} onPress={this._markAllAsRead}>
          <Icon
            name={closeIcon.name}
            type={closeIcon.type}
            color={closeIcon.color}
            size={closeIcon.size}
          />
          <Text style={styles.textMarkAll}>Mark all as read</Text>
        </TouchableView>
        {this._renderNotificationList()}
      </View>
    );
  }

  _renderLoading() {
    return (
      <View style={styles.loadingContainer}>
        <LoadingIndicator />
      </View>
    );
  }

  render() {
    if (!this.state.refreshing && this.props.data.loading) {
      return this._renderLoading();
    }
    if (this.props.data.error) {
      return (
        <EmptyCollection
          emptyText="You don't have any notification."
          reloadable
          onReload={this._onRefresh}
        />
      );
    }
    return this._renderNotificationContainer();
  }
}

NotificationScene.header = {
  leftIcon: 'drawer',
  theme: 'dark',
  backgroundColor: Colors.primary,
  statusBarBackgroundColor: Colors.primary,
};

NotificationScene.footer = {
  activeColor: Colors.primary,
  show: true,
};

NotificationScene.propTypes = {
  data: PropTypes.object,
  markAllNotificationsAsReadMutation: PropTypes.func,
};

const mapDispatchToProps = dispatch => ({
  home: () => dispatch(NavigationActions.navigate({ routeName: 'home' })),
});

const MarkAllNotificationsAsReadWithMutation = graphql(
  gql(MUTATION_MARK_ALL_NOTIFICATION_AS_READ),
  {
    name: 'markAllNotificationsAsReadMutation',
  },
);

const GetNotificationsWithQuery = graphql(gql(GET_NOTIFICATIONS));

export default compose(
  MarkAllNotificationsAsReadWithMutation,
  GetNotificationsWithQuery,
  connect(undefined, mapDispatchToProps),
)(NotificationScene);
