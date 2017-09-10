import React from 'react';
import PropTypes from 'prop-types';
import { Colors } from '~/Theme';
import ListView from '../ListView';

const calendarIcon = {
  type: 'material-community',
  name: 'calendar-plus',
  color: Colors.black,
  size: 30,
};

const Detail = ({ schedule }) =>
  <ListView detail={schedule.activities} calendarIcon={calendarIcon} />;

Detail.propTypes = {
  schedule: PropTypes.object,
};

export default Detail;
