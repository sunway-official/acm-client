import { StyleSheet } from 'react-native';
import { Metrics, Colors, Fonts } from 'Theme';

const { baseMargin, doubleBaseMargin } = Metrics;
const { white, grey } = Colors;
const { size } = Fonts;

export default StyleSheet.create({
  container: {
    backgroundColor: white,
    margin: baseMargin,
    paddingTop: baseMargin,
    paddingHorizontal: baseMargin,
  },
  info: {
    flexDirection: 'row',
    paddingBottom: baseMargin,
  },
  descriptionContainer: {
    padding: baseMargin,
    marginTop: 0,
  },
  title: {
    fontSize: size.regular,
    flex: 1,
    flexWrap: 'wrap',
  },
  icon: {
    marginRight: doubleBaseMargin,
    marginLeft: baseMargin,
    alignItems: 'center',
  },
  noContent: {
    paddingVertical: doubleBaseMargin,
    justifyContent: 'center',
    alignItems: 'center',
  },
  relatedSchedulesContainer: {
    marginHorizontal: baseMargin,
    marginBottom: baseMargin,
    padding: baseMargin,
    backgroundColor: white,
  },
  scheduleBlock: {
    flexDirection: 'row',
    paddingVertical: baseMargin,
    marginVertical: 2,
  },
  date: {
    width: 60,
    alignItems: 'center',
  },
  dateNum: { fontSize: size.h6 },
  time: {
    width: 80,
    paddingLeft: baseMargin,
    justifyContent: 'space-between',
  },
  scheduleInfo: {
    flex: 1,
    paddingLeft: baseMargin,
    paddingRight: baseMargin,
  },
  secondaryText: { color: grey },
  trackingIcon: {
    paddingHorizontal: baseMargin,
    justifyContent: 'center',
  },
  emptyIcon: { width: 100, height: 105 },
});
