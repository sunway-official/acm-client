import { StyleSheet } from 'react-native';
import { Metrics, Colors } from 'Theme';

export default StyleSheet.create({
  container: {
    marginBottom: Metrics.baseMargin,
  },
  header: {
    flexDirection: 'row',
    paddingHorizontal: Metrics.doubleBaseMargin,
    paddingVertical: Metrics.baseMargin,
    borderBottomColor: Colors.lightGrey,
    borderBottomWidth: 1,
  },
  textMarkAll: {
    marginLeft: Metrics.baseMargin,
  },
});
