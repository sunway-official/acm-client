import { StyleSheet } from 'react-native';
import { Metrics, Colors } from '~/Theme';

export default StyleSheet.create({
  calendar: {
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.grey,
    backgroundColor: Colors.white,
    paddingBottom: Metrics.doubleBaseMargin,
  },
  week: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  dayOuter: {
    flex: 1,
  },
  dayInner: {
    alignItems: 'center',
    paddingVertical: Metrics.baseMargin,
    marginHorizontal: Metrics.baseMargin * 1.5,
    backgroundColor: Colors.white,
    borderColor: Colors.white,
  },
  todayDayInner: {
    backgroundColor: Colors.deepOrange,
    borderRadius: 50,
  },
  todayDayText: {
    color: Colors.white,
  },
  dayText: {
    textAlign: 'right',
  },
  dayWeekendText: {
    color: Colors.darkDeepOrange,
  },
  shadedText: {
    color: Colors.grey,
  },
});
