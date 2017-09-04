import React, { Component } from 'react';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import PropTypes from 'prop-types';
import Agenda from './Agenda';
import MyAgenda from './MyAgenda';
import CustomTabBar from './CustomTabBar';

class Schedule extends Component {
  render() {
    return (
      <ScrollableTabView
        renderTabBar={() =>
          <CustomTabBar
            tabStyle={{ paddingBottom: 0 }}
            activeTabBackgroundColor="black"
            activeTextColor="white"
            inactiveTabBackgroundColor="white"
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
