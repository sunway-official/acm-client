import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import Agenda from './Agenda';
import MyAgenda from './MyAgenda';
import DefaultTabBar from './CustomTabBar/DefaultTabBar';
import { Colors } from '~/Theme';

class Schedule extends Component {
  static header = {
    theme: 'light',
  };

  static footer = {
    show: true,
    activeColor: Colors.deepOrange,
  };

  static propTypes = {};
  render() {
    return (
      <ScrollableTabView
        locked={true}
        renderTabBar={() =>
          <DefaultTabBar
            tabStyle={{ paddingBottom: 0 }}
            activeTabBackgroundColor="black"
            activeTextColor="white"
            inactiveTabBackgroundColor="white"
            underlineStyle={{ height: 0 }}
          />}
      >
        <Agenda tabLabel="Agenda" />
        <MyAgenda tabLabel="My Agenda" />
      </ScrollableTabView>
    );
  }
}

export default Schedule;
