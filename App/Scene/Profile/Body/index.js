import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { TabNavigator } from 'react-navigation';
import { Metrics, Colors } from '~/Theme';
import { Text } from '~/Component';
import { About, Activity, Networking } from './Content';
import styles from './styles';

const TabsView = TabNavigator(
  {
    About: About,
    Activity: Activity,
    Networking: Networking,
  },
  {
    tabBarComponent: TabBarTop,
    tabBarPosition: 'top',
    swipeEnabled: true,
    animationEnabled: true,
    tabBarOptions: {
      scrollEnabled: true,
      indicatorStyle: {
        backgroundColor: 'black',
      },
      style: {
        backgroundColor: 'transparent',
        marginBottom: Metrics.smallMargin,
      },
      labelStyle: { margin: 0, color: Colors.black },
      upperCaseLabel: false,
    },
  },
);

class Body extends Component {
  static propTypes = {};
  render() {
    return (
      <View style={styles.container}>
        <TabsView />
      </View>
    );
  }
}

export default Body;
