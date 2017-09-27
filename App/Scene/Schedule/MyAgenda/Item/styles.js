import { StyleSheet } from 'react-native';
import { Fonts, Metrics, Colors } from '../../../../Theme';
const Schedule = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: Metrics.baseMargin,
  },
  headerWrapper: {
    marginLeft: Metrics.doubleBaseMargin,
  },
  contentContainer: {
    flexDirection: 'row',
  },
  contentDate: {
    marginLeft: Metrics.doubleBaseMargin,
    paddingTop: Metrics.baseMargin,
    width: 48,
  },
  contentWrapper: {
    flex: 1,
    marginLeft: Metrics.doubleBaseMargin,
  },
  textDay: {
    fontSize: Fonts.size.h6,
  },
  textMonth: {
    fontSize: Fonts.size.medium,
  },
  itemWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: Metrics.baseMargin,
    backgroundColor: Colors.primary,
    marginBottom: Metrics.smallMargin,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
  },
  itemInfo: {
    flex: 1,
    paddingRight: Metrics.doubleBaseMargin,
  },
  itemAction: {
    // flex: 1,
    marginLeft: 'auto',
    marginRight: Metrics.doubleBaseMargin,
  },
  itemText: {
    color: Colors.white,
  },
});

export default Schedule;
