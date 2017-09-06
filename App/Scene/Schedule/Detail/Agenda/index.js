import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ListView from '../ListView';

class Detail extends Component {
  static navigationOptions = {
    tabBarLabel: 'Tue Sep 5, 2017',
  };

  render() {
    return <ListView listAnimation="fadeInLeft" />;
  }
}

Detail.propTypes = {};

export default Detail;
