import { StyleSheet } from 'react-native';
import { Metrics, Colors } from '~/Theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  noHeader: {
    marginTop: Metrics.statusBarHeight,
  },
});
