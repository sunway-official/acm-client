import React, { Component } from 'react';
import { View, BackHandler } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import AppNavigation from '../Navigation';
import Drawer from '../Navigation/Drawer';

import styles from './styles';

class Root extends Component {
  static propTypes = {
    navigateBack: PropTypes.func,
  };

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.props.navigateBack);
  }

  render() {
    return (
      <View style={styles.container}>
        <Drawer>
          <View style={styles.container}>
            <AppNavigation />
          </View>
        </Drawer>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    navigateBack: () => dispatch(NavigationActions.back()),
  };
};

export default connect(undefined, mapDispatchToProps)(Root);
