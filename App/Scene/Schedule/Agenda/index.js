import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { TabNavigator } from 'react-navigation';
import { Colors, Metrics } from '~/Theme';
import Detail from '../Detail/Agenda';
import Fixture from '../fixture';

const tabs = {};
Fixture.map((schedule, index) => {
  let key = 'Day ' + (index + 1);
  tabs = {
    ...tabs,
    [key]: {
      screen: () => <Detail schedule={schedule} />,
      navigationOptions: { tabBarLabel: schedule.date },
    },
  };
});

const TabsView = TabNavigator(tabs, {
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
});

class Agenda extends Component {
  static propTypes = {};
  render() {
    return <TabsView />;
  }
}

export default Agenda;
