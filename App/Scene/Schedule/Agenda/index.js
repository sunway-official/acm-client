import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TabNavigator } from 'react-navigation';
import Detail from '../Detail/Agenda';

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
];

const tabs = {};
schedules.map((schedule, index) => {
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
    },
    labelStyle: { margin: 0, color: 'black' },
    upperCaseLabel: false,
  },
});

class Agenda extends Component {
  render() {
    return <TabsView />;
  }
}

Agenda.propTypes = {};

export default Agenda;

// <ScrollableTabView
//         initialPage={0}
//         renderTabBar={() =>
//           <ScrollableTabBar
//             underlineStyle={{ height: 0 }}
//             style={{ borderColor: 'black', borderWidth: 2 }}
//             activeIcon={true}
//           />}
//       >
//         <Detail tabLabel="Detail #1" />
//         <Detail tabLabel="Detail #2" />
//         <Detail tabLabel="Detail #3" />
//         <Detail tabLabel="Detail #4" />
//       </ScrollableTabView>
