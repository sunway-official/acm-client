import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { View, ActivityIndicator } from 'react-native';
import { addNavigationHelpers } from 'react-navigation';
import styles from './styles';
import { AppNavigator, KEY } from './Redux';

const AppNavigation = ({nav, dispatch}) => (
  <View style={styles.container}>
    <View style={styles.loadingContainer}>
      <ActivityIndicator/>
    </View>
    <AppNavigator navigation={addNavigationHelpers({
      dispatch,
      state: nav,
    })}/>
  </View>
);

AppNavigation.propTypes = {
  nav: PropTypes.object,
  dispatch: PropTypes.func
};

const mapStateToProps = (state) => {
  return {
    nav: state[KEY].navigation
  };
};

export default connect(mapStateToProps)(AppNavigation);
