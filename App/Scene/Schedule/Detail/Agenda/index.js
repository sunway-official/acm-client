import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Colors } from '../../../../Theme';
import ListView from '../ListView';

class Detail extends Component {
  render() {
    const { schedule } = this.props;
    return <ListView listAnimation="fadeInLeft" detail={schedule.activities} />;
  }
}

Detail.propTypes = {
  schedule: PropTypes.object,
};

export default Detail;
