import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Text } from '~/Component';

class About extends Component {
  static propTypes = {};

  render() {
    return (
      <View style={{ flex: 1, marginTop: 10, backgroundColor: 'white' }}>
        <Text>About</Text>
      </View>
    );
  }
}

export default About;
