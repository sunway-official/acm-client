import { StyleSheet } from 'react-native';
import { Colors, Metrics, Fonts } from 'Theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    margin: Metrics.baseMargin,
    backgroundColor: Colors.white,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContentContainer: {
    padding: Metrics.baseMargin,
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
