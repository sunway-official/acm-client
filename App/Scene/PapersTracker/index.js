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

import { PAPER } from './fixture';
import Item from './Item';
import styles from './styles';

class PapersTrackerScene extends Component {
  _renderPapersTrackerList() {
    return (
      <FlatList
        data={PAPER}
        renderItem={({ item, index }) => <Item key={index} {...item} />}
        keyExtractor={(item, index) => index}
      />
    );
  }

  _renderPapersTrackerContainer() {
    return (
      <View style={styles.container}>{this._renderPapersTrackerList()}</View>
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
    return this._renderPapersTrackerContainer();
  }
}

PapersTrackerScene.drawer = {
  primary: true,
};

PapersTrackerScene.header = {
  leftIcon: 'drawer',
  theme: 'dark',
};

PapersTrackerScene.propTypes = {
  home: PropTypes.func,
};

const mapDispatchToProps = dispatch => ({
  home: () => dispatch(NavigationActions.navigate({ routeName: 'home' })),
});

export default connect(undefined, mapDispatchToProps)(PapersTrackerScene);
