import React, { Component } from 'react';
import { View, StatusBar, BackHandler } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AppNavigation from '../Navigation';
import Drawer from '../Navigation/Drawer';

import styles from './styles';

class Root extends Component {
  static propTypes = {
    navigateBack: PropTypes.func,
  };

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', Actions.pop());
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="transparent" translucent />
        <Drawer>
          <View style={styles.container}>
            <AppNavigation />
          </View>
        </Drawer>
      </View>
    );
  }
}

export default Root;
