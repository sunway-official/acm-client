import { StyleSheet } from 'react-native';
import { Metrics } from 'Theme';

const styles = StyleSheet.create({
  emptyContainer: {
    marginBottom: Metrics.baseMargin,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default styles;
