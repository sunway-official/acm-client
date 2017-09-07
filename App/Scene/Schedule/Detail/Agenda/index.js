import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Colors } from '~/Theme';
import ListView from '../ListView';

const calendarIcon = {
  type: 'material-community',
  name: 'calendar-plus',
  color: Colors.black,
  size: 30,
};

class Detail extends Component {
  render() {
    const { schedule } = this.props;
    return (
      <ListView
        listAnimation="fadeInLeft"
        detail={schedule.activities}
        calendarIcon={calendarIcon}
      />
    );
  }
}

Detail.propTypes = {
  schedule: PropTypes.object,
};

export default Detail;
