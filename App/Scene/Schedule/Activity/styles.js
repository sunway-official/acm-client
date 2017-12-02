import { StyleSheet } from 'react-native';
import { Metrics, Colors, Fonts } from '../../../Theme';

const { smallMargin, baseMargin, doubleBaseMargin } = Metrics;
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
    justifyContent: 'flex-start',
    paddingBottom: baseMargin,
  },
  descriptionContainer: {
    padding: baseMargin,
    marginTop: 0,
  },
  title: {
    fontSize: size.regular,
  },
  icon: {
    marginRight: doubleBaseMargin,
    marginLeft: baseMargin,
    alignItems: 'center',
  },
  noContent: {
    padding: doubleBaseMargin,
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
    paddingHorizontal: baseMargin,
    paddingVertical: baseMargin,
    marginVertical: 2,
    // backgroundColor: 'yellow',
  },
  timeline: {
    position: 'relative',
    justifyContent: 'space-between',
    paddingVertical: smallMargin,
    // backgroundColor: 'red',
  },
  verticalLine: {
    position: 'absolute',
    top: 9,
    left: '49%',
    height: '80%',
    borderLeftWidth: 1,
    borderLeftColor: grey,
  },
  circleIconTop: {
    backgroundColor: white,
    marginBottom: baseMargin,
  },
  circleIconBottom: {
    backgroundColor: white,
    marginTop: baseMargin,
  },
  time: {
    width: 80,
    paddingLeft: baseMargin,
    justifyContent: 'space-between',
    // backgroundColor: 'green',
  },
  scheduleInfo: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: smallMargin,
    paddingRight: baseMargin,
    // backgroundColor: 'blue',
  },
  secondaryText: { color: grey },
  trackingIcon: {
    paddingHorizontal: baseMargin,
    justifyContent: 'center',
    // backgroundColor: 'orange',
  },
});
