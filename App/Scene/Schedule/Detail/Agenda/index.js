import React from 'react';
import PropTypes from 'prop-types';
import { Colors } from '~/Theme';
import ListView from '../ListView';

const Detail = ({ schedule }) => <ListView detail={schedule.activities} />;

Detail.propTypes = {
  schedule: PropTypes.object,
};

export default Detail;
