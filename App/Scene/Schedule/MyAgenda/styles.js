import { StyleSheet } from 'react-native';
import { Colors, Metrics } from '~/Theme';

const Schedule = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
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

export default Schedule;
