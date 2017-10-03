import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { View } from 'react-native';
import { News } from '~/Component';
import { news } from '~/Scene/Profile/fixture';

class Activities extends Component {
  static propTypes = {};
  render() {
    return (
      <View>
        {news.map((item, index) => <News item={item} key={index} />)}
      </View>
    );
  }
}

export default Activities;
