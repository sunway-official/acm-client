import moment from 'moment';

const normalDate = date => {
  return Number(moment(date).format('YYYYMMDD'));
};

export const dateComparison = date => {
  if (normalDate(date) < normalDate()) {
    return -1;
  }
  if (normalDate(date) === normalDate()) {
    return 0;
  }
  return 1;
};

export const timeComparison = activities => {
  const current_time = new Date().getTime();
  activities.map(detail => {
    const endTime = new Date(detail.end).getTime();
    if (endTime < current_time) {
      detail.isBefore = true;
    } else {
      detail.isBefore = false;
    }
  });
  return activities;
};

export default {
  dateComparison,
  timeComparison,
};
