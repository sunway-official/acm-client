import { StyleSheet } from 'react-native';
import { Metrics } from 'Theme';

const { doubleBaseMargin } = Metrics;

export default StyleSheet.create({
  container: {
    margin: doubleBaseMargin,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
  },
});
