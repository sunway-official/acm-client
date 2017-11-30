import { StyleSheet } from 'react-native';
import { Colors, Metrics } from '~/Theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    margin: Metrics.baseMargin,
    backgroundColor: Colors.white,
  },
  scrollView: {
    padding: Metrics.baseMargin,
    flex: 1,
  },
});
