import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import {
  Text,
  EmptyCollection,
  LoadingIndicator,
  TouchableView,
} from 'Component';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { FlatList } from 'react-native';
import { compose, gql, graphql } from 'react-apollo';
import { NavigationActions } from 'Reduck/Navigation';
import { Colors } from 'Theme';
import GET_NOTIFICATIONS from 'Graphql/query/getNotifications.graphql';

// import { NOTIFICATION } from './fixture';
import Item from './Item';
import styles from './styles';

const closeIcon = {
  type: 'material-community',
  name: 'check-all',
  color: Colors.black,
  size: 20,
};

// const NETWORK_STATUS_LOADING = 1;

class NotificationScene extends Component {
  _renderNotificationList() {
    return (
      <FlatList
        data={this.props.data.getNotifications}
        renderItem={({ item, index }) => <Item key={index} {...item} />}
        keyExtractor={(item, index) => index}
      />
    );
  }

  _renderNotificationContainer() {
    return (
      <View style={styles.container}>
        <TouchableView style={styles.header}>
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
    if (this.props.data.loading) {
      return this._renderLoading();
    }
    if (this.props.data.error) {
      return <EmptyCollection emptyText="You don't have any notification." />;
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
};

const mapDispatchToProps = dispatch => ({
  home: () => dispatch(NavigationActions.navigate({ routeName: 'home' })),
});

export default compose(
  graphql(gql(GET_NOTIFICATIONS)),
  connect(undefined, mapDispatchToProps),
)(NotificationScene);
