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
  static propTypes = {
    schedule: PropTypes.object,
  };

  render() {
    const { schedule } = this.props;
    return (
      <ListView detail={schedule.activities} calendarIcon={calendarIcon} />
    );
  }
}

export default Detail;
