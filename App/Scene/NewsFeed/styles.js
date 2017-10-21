import { StyleSheet } from 'react-native';
import { Metrics } from '~/Theme';

export default StyleSheet.create({
  container: {
    marginHorizontal: Metrics.baseMargin,
    paddingTop: Metrics.baseMargin,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
  },
});
