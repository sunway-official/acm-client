import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, FlatList } from 'react-native';
import ListView from '../ListView';

const schedules = [
  {
    date: 'Mon Sep 4, 2017',
    activities: [
      {
        title: 'Breakfast',
        shortDescription: 'something',
      },
      {
        title: 'Short Talk',
        shortDescription: 'something',
      },
      {
        title: 'Music',
        shortDescription: 'something',
      },
    ],
  },
  {
    date: 'Tue Sep 5, 2017',
    activities: [
      {
        title: 'Breakfast 1',
        shortDescription: 'something',
      },
      {
        title: 'Short Talk 1',
        shortDescription: 'something',
      },
    ],
  },
  {
    date: 'Wed Sep 6, 2017',
    activities: [
      {
        title: 'Short Talk',
        shortDescription: 'something',
      },
    ],
  },
  {
    date: 'Thur Sep 7, 2017',
    activities: [
      {
        title: 'Breakfast',
        shortDescription: 'something',
      },
      {
        title: 'Short Talk',
        shortDescription: 'something',
      },
      {
        title: 'Music',
        shortDescription: 'something',
      },
    ],
  },
];

class Detail extends Component {
  _renderScheduleOfDate({ item, index }) {
    return (
      <View key={index}>
        <View>
          <Text>
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
        data={schedules}
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
