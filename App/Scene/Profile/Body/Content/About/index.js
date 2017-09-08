import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Text } from '~/Component';

class About extends Component {
  static propTypes = {};

  render() {
    return (
      <View>
        <Text>About</Text>
      </View>
    );
  }
}

export default About;
