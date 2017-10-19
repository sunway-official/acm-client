import moment from 'moment';
import { DATE_FORMAT } from '~/env';

export const toUTC = (date, format = DATE_FORMAT) => {
  return moment(date, format).toISOString();
};

export const toLocal = (date, format = DATE_FORMAT) => {
  return moment(date)
    .local()
    .format(format);
};

export default {
  toUTC,
  toLocal,
};
