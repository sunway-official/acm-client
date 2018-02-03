import { StyleSheet } from 'react-native';
import { Metrics } from 'Theme';

export default StyleSheet.create({
  container: {
    paddingTop: Metrics.baseMargin,
    marginBottom: Metrics.navBarHeight - Metrics.baseMargin,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  emptyContainer: {
    flex: 1,
    paddingTop: Metrics.baseMargin,
  },
  emptyCollection: {
    marginHorizontal: Metrics.baseMargin,
  },
  listContentContainer: {
    paddingHorizontal: Metrics.baseMargin,
  },
});
