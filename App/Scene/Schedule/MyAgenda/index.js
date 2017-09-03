import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';

class MyAgenda extends Component {
  render() {
    return (
      <View flex={1}>
        <Text>My Agenda Tab</Text>
      </View>
    );
  }
}

MyAgenda.propTypes = {};

export default MyAgenda;
