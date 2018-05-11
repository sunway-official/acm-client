import { StyleSheet } from 'react-native';
import { Colors, Metrics } from 'Theme/index';

export default StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    minHeight: 200,
  },
  container: {
    backgroundColor: Colors.white,
    height: '100%',
  },
  chart: {
    paddingTop: Metrics.doubleBaseMargin,
  },
});
