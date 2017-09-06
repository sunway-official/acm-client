import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, FlatList } from 'react-native';
import ListView from '../ListView';
import Fixture from '../../fixture';
import styles from './styles';

class Detail extends Component {
  _renderScheduleOfDate({ item, index }) {
    return (
      <View key={index}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            {item.date}
          </Text>
        </View>
        <ListView listAnimation="fadeInLeft" detail={item.activities} />
      </View>
    );
  }

  render() {
    return (
      <FlatList
        data={Fixture}
        keyExtractor={(item, index) => index}
        renderItem={this._renderScheduleOfDate}
      />
    );
  }
}

Detail.propTypes = {
  schedule: PropTypes.object,
};

export default Detail;
