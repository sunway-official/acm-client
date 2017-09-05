import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import styles from './styles';

const data = [1, 2, 3, 4, 5];

class Detail extends Component {
  _renderItem({ item, index }) {
    const marginBottom = index === data.length - 1 ? 0 : 1;
    return (
      <View
        style={[
          styles.item,
          {
            marginBottom: marginBottom,
          },
        ]}
      >
        <Text>
          {item}
        </Text>
      </View>
    );
  }
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={data}
          keyExtractor={(item, index) => index}
          renderItem={this._renderItem}
        />
      </View>
    );
  }
}

Detail.propTypes = {};

export default Detail;
