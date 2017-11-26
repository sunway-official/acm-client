import { StyleSheet } from 'react-native';
import { Metrics } from '~/Theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noHeader: {
    marginTop: Metrics.statusBarHeight,
  },
});
