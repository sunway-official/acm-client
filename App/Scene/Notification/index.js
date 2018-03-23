import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Button } from 'react-native';
import {
  Text,
  EmptyCollection,
  LoadingIndicator,
  TouchableView,
} from 'Component';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { FlatList } from 'react-native';
import { NavigationActions } from 'Reduck/Navigation';
import { Colors } from 'Theme';

import { NOTIFICATION } from './fixture';
import Item from './Item';
import styles from './styles';

const text = ['Welcome to Notification!'];

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
        data={NOTIFICATION}
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
    const { home } = this.props;
    // if (networkStatus === NETWORK_STATUS_LOADING) {
    //   return this._renderLoading();
    // }
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
  home: PropTypes.func,
  networkStatus: PropTypes.number,
};

const mapDispatchToProps = dispatch => ({
  home: () => dispatch(NavigationActions.navigate({ routeName: 'home' })),
});

export default connect(undefined, mapDispatchToProps)(NotificationScene);
