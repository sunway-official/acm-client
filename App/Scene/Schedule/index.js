import React, { Component } from 'react';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import PropTypes from 'prop-types';
import Agenda from './Agenda';
import MyAgenda from './MyAgenda';
import DefaultTabBar from './CustomTabBar/DefaultTabBar';

class Schedule extends Component {
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

Schedule.propTypes = {};

export default Schedule;
