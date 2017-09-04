import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';

class Agenda extends Component {
  render() {
    return (
      <View
        style={{ flex: 1, backgroundColor: 'grey', margin: 10, marginTop: 0 }}
      >
        <Text>Agenda Tab</Text>
      </View>
    );
  }
}

Agenda.propTypes = {};

export default Agenda;
