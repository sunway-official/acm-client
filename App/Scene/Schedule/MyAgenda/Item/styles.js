import { StyleSheet } from 'react-native';
import { Fonts, Metrics, Colors } from '~/Theme';

const Schedule = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: Metrics.baseMargin,
    paddingRight: Metrics.doubleBaseMargin,
    alignItems: 'center',
  },
  blurWrapper: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  headerWrapper: {
    marginLeft: Metrics.doubleBaseMargin,
  },
  contentContainer: {
    flexDirection: 'row',
  },
  contentDate: {
    marginLeft: Metrics.doubleBaseMargin,
    paddingTop: Metrics.smallMargin,
    width: 48,
  },
  contentWrapper: {
    flex: 1,
    marginLeft: Metrics.doubleBaseMargin * 2,
  },
  lineWrapper: {
    marginTop: Metrics.doubleBaseMargin,
  },
  circleBackground: {
    backgroundColor: Colors.white,
    borderRadius: 10,
  },
  textDay: {
    fontSize: Fonts.size.h5,
  },
  todayDayInner: { color: Colors.deepOrange },
  textMonth: {
    fontSize: Fonts.size.medium,
  },
  itemWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: Metrics.baseMargin,
    backgroundColor: Colors.primary,
    marginTop: Metrics.baseMargin,
    borderTopLeftRadius: 2,
    borderBottomLeftRadius: 2,
  },
  itemInfo: {
    flex: 1,
    paddingRight: Metrics.doubleBaseMargin,
  },
  itemAction: {
    // flex: 1,
    marginLeft: 'auto',
    marginRight: Metrics.baseMargin,
  },
  itemText: {
    color: Colors.white,
  },
});

export default Schedule;
