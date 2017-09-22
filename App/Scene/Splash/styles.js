import { StyleSheet } from 'react-native';
import { Metrics, Colors } from '~/Theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    width: Metrics.screenWidth,
    height: Metrics.screenHeight,
  },
  loadingWrapper: {
    position: 'absolute',
    width: Metrics.screenWidth,
    bottom: 160,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: Colors.white,
    marginTop: Metrics.baseMargin,
    backgroundColor: Colors.transparent,
  },
});
