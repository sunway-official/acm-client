import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TabNavigator } from 'react-navigation';
import Detail from './Detail';

const TabsView = TabNavigator(
  {
    Day1: { screen: Detail },
    Day2: { screen: Detail },
    Day3: { screen: Detail },
    Day4: { screen: Detail },
    Day5: { screen: Detail },
    Day6: { screen: Detail },
  },
  {
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
  },
);

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
