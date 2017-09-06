import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ListView from '../ListView';

class Detail extends Component {
  render() {
    return <ListView listAnimation="fadeInLeft" />;
  }
}

Detail.propTypes = {};

export default Detail;
