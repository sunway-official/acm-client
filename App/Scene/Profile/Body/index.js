import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { TabNavigator, TabBarTop } from 'react-navigation';
import { Metrics, Colors } from '~/Theme';
import { Text } from '~/Component';
import { About, Activity, Networking } from './Content';
import styles from './styles';

const TabsView = TabNavigator(
  {
    About: { screen: About },
    Activity: { screen: Activity },
    Networking: { screen: Networking },
  },
  {
    tabBarComponent: TabBarTop,
    tabBarPosition: 'top',
    swipeEnabled: true,
    animationEnabled: true,
    tabBarOptions: {
      indicatorStyle: {
        backgroundColor: 'black',
      },
      style: {
        backgroundColor: 'white',
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
