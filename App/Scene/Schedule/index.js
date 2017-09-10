import React from 'react';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import Agenda from './Agenda';
import MyAgenda from './MyAgenda';
import DefaultTabBar from './CustomTabBar/DefaultTabBar';
import { Colors } from '~/Theme';

const Schedule = () =>
  <ScrollableTabView
    locked={true}
    renderTabBar={() =>
      <DefaultTabBar
        tabStyle={{ paddingBottom: 0 }}
        activeTabBackgroundColor={Colors.black}
        activeTextColor="white"
        inactiveTabBackgroundColor="white"
        underlineStyle={{ height: 0 }}
      />}
  >
    <Agenda tabLabel="Agenda" />
    <MyAgenda tabLabel="My Agenda" />
  </ScrollableTabView>;

Schedule.header = {
  // theme: 'dark',
  // backgroundColor: Colors.brown,
  // statusBarBackgroundColor: Colors.brown,
};

Schedule.footer = {
  show: true,
  activeColor: Colors.black,
};

export default Schedule;
