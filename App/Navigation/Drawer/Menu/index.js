import React, { Component } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';

class Menu extends Component {
  static propTypes = {};
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer} />
      </View>
    );
  }
}

export default Menu;
