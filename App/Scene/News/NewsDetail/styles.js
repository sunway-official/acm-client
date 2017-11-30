import { StyleSheet } from 'react-native';
import { Colors, Metrics, Fonts } from '~/Theme';

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
  newsContentContainer: {
    paddingVertical: Metrics.baseMargin,
  },
  newsContentText: {
    fontSize: Fonts.size.medium,
  },
  newshightLightContentText: {
    fontSize: Fonts.size.h5,
  },
});
