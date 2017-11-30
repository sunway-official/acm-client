import { StyleSheet } from 'react-native';
import { Colors, Metrics } from '~/Theme';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  verticalLine: {
    position: 'absolute',
    left: 62,
    borderLeftWidth: 2,
    borderLeftColor: Colors.lightGrey,
    height: '100%',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gotoBtn: {
    padding: Metrics.doubleBaseMargin,
  },
  goToText: {
    color: Colors.primary,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  emptyCollection: {
    paddingVertical: 0,
    flex: 0,
  },
});
