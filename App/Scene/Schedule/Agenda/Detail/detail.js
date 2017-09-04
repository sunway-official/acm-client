import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import styles from './styles';

class Detail extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.item}>
          <Text>Activity #1</Text>
          <Text>Activity #1.1</Text>
          <Text>Activity #1.2</Text>
          <Text>Activity #1.3</Text>
        </View>
      </View>
    );
  }
}

Detail.propTypes = {};

export default Detail;
