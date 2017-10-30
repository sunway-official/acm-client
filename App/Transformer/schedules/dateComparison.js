import moment from 'moment';
import { transformServerDate } from '../../Transformer';

const normalDate = date => {
  // format('L'): dd/MM/yyyy
  return moment(date).format('L');
};

export const dateComparison = date => {
  /*
   * isToday = dateOfSchedule === TODAY;
   * isBefore = dateOfSchedule < TODAY;
   * isFuture = dateOfSchedule > TODAY;
   */
  if (normalDate(date) < normalDate()) {
    return -1;
  }

  if (normalDate(date) === normalDate()) {
    return 0;
  }

  return 1;
};

export const timeComparison = activities => {
  // format('LT'): HH:mm mma (e.g. 12:30 am)
  const current_time = transformServerDate.toLocalTime(moment());
  activities.map(detail => {
    const endTime = transformServerDate.toLocalTime(detail.schedule.end);
    if (endTime >= current_time) {
      detail.activity.isAfter = true;
    } else {
      detail.activity.isAfter = false;
    }
  });

  return activities;
};

export default {
  dateComparison,
  timeComparison,
};
