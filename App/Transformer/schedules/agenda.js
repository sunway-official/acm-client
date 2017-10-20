import { List } from 'immutable';
import moment from 'moment';

export default (data, key) => {
  // Initiate
  let DATA = List(data);

  let result = List();

  // start date key (ex: "start")
  const KEY = key;

  // Group by item that has the same day
  DATA = DATA.groupBy(item => {
    // Parse start date to DDMMYYY to compare
    // Feel free to change the format if you want to change groupBy rule
    let date = moment(new Date(item[KEY])).format('DDMMYYYY');
    return date;
  });

  // Loop through data items
  DATA.forEach(item => {
    // Sort activities by date
    const activities = item.sort((a, b) => {
      const timeA = new Date(a[KEY]).getTime();
      const timeB = new Date(b[KEY]).getTime();
      // Increasement sort
      if (timeA > timeB) return 1;
      if (timeA < timeB) return -1;
      return 0;
    });
    // Return new conference date object with its activities
    result = result.push({
      date: activities.first()[KEY],
      activities: activities.toJS(),
    });
  });

  // Sort dates
  result = result.sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    // Increasement sort
    if (dateA > dateB) return 1;
    if (dateA < dateB) return -1;
    return 0;
  });

  // Finish
  return result.toJS();
};
