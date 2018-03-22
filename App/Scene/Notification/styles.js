import { StyleSheet } from 'react-native';
import { Metrics } from 'Theme';

export default StyleSheet.create({
  container: {
    marginBottom: Metrics.baseMargin,
  },
  header: {
    flexDirection: 'row',
    paddingHorizontal: Metrics.doubleBaseMargin,
    paddingVertical: Metrics.baseMargin,
  },
  textMarkAll: {
    marginLeft: Metrics.baseMargin,
  },
});
