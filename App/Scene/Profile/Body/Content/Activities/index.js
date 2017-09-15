import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { NewsFeed } from '~/Component';
import { news } from '../../fixture';

class Activities extends Component {
  static propTypes = {};

  constructor(props, context) {
    super(props, context);
  }
  render() {
    return <NewsFeed news={news} />;
  }
}

export default Activities;
