import moment from 'moment';

export const formatDateToNumber = date => {
  return Number(moment(date).format('YYYYMMDD'));
};

export const compareWithCurrentDate = date => {
  // schedule's date < current date
  if (formatDateToNumber(date) < formatDateToNumber()) {
    return -1;
  }
  // schedule's date = current date
  if (formatDateToNumber(date) === formatDateToNumber()) {
    return 0;
  }
  // schedule's date > current date
  return 1;
};

export const compareWithCurrentTime = activities => {
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
  formatDateToNumber,
  compareWithCurrentDate,
  compareWithCurrentTime,
};
