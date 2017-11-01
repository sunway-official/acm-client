import { StyleSheet } from 'react-native';
import { Fonts, Metrics, Colors } from '~/Theme';

export default StyleSheet.create({
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
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  headerWrapper: {
    marginLeft: Metrics.doubleBaseMargin,
  },
  contentContainer: {
    flexDirection: 'row',
  },
  contentDate: {
    paddingTop: Metrics.smallMargin,
    paddingLeft: Metrics.baseMargin,
    width: 48,
    alignItems: 'center',
  },
  contentWrapper: {
    flex: 1,
    marginLeft: Metrics.doubleBaseMargin * 1.8,
  },
  lineWrapper: {
    marginTop: Metrics.doubleBaseMargin,
    marginLeft: Metrics.baseMargin,
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
    backgroundColor: Colors.white,
    marginTop: Metrics.baseMargin,
    borderWidth: 2,
    borderColor: Colors.lightGrey,
    borderRadius: Metrics.buttonCornerRadius,
  },
  itemInfo: {
    flex: 1,
    paddingRight: Metrics.doubleBaseMargin,
  },
  itemAction: {
    marginLeft: 'auto',
    marginRight: Metrics.baseMargin,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
});
