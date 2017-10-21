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
  warningText: { color: Colors.grey },
  gotoBtn: {
    padding: Metrics.baseMargin,
    marginTop: Metrics.baseMargin,
    backgroundColor: Colors.primary,
  },
  goToText: {
    color: Colors.white,
  },
});
