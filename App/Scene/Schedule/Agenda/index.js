import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import ScrollableTabBar from '../CustomTabBar/ScrollableTabBar';
import Detail from './Detail';

class Agenda extends Component {
  render() {
    return (
      <ScrollableTabView
        initialPage={0}
        renderTabBar={() =>
          <ScrollableTabBar
            underlineStyle={{ height: 0 }}
            style={{ borderColor: 'black', borderWidth: 2 }}
            activeIcon={true}
          />}
      >
        <Detail tabLabel="Detail #1" />
        <Detail tabLabel="Detail #2" />
        <Detail tabLabel="Detail #3" />
        <Detail tabLabel="Detail #4" />
      </ScrollableTabView>
    );
  }
}

Agenda.propTypes = {};

export default Agenda;
