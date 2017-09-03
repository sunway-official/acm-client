import React, { Component } from 'react';
import { Scene, Tabs, Stack } from 'react-native-router-flux';
import { View, Text } from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import PropTypes from 'prop-types';
import Agenda from './Agenda';
import MyAgenda from './MyAgenda';
import CustomTabBar from './CustomTabBar';
import styles from './styles';

class Schedule extends Component {
  render() {
    return (
      <ScrollableTabView
        renderTabBar={() => <CustomTabBar activeTextColor="red" />}
      >
        <Agenda tabLabel="Agenda" />
        <MyAgenda tabLabel="My Agenda" />
      </ScrollableTabView>
    );
  }
}

Schedule.propTypes = {};

export default Schedule;
