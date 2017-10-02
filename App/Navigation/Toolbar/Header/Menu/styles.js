import { StyleSheet, Platform } from 'react-native';
import { Metrics, Colors } from '~/Theme';

const IS_ANDROID = Platform.OS === 'android';

export default StyleSheet.create({
  modal: {
    position: 'absolute',
    top: IS_ANDROID
      ? Metrics.baseMargin
      : Metrics.baseMargin + Metrics.statusBarHeight,
    right: Metrics.baseMargin,
    margin: 0,
  },
  container: {
    backgroundColor: Colors.white,
    marginHorizontal: Metrics.baseMargin,
  },
  item: {
    flexDirection: 'row',
    padding: Metrics.baseMargin,
    alignItems: 'center',
  },
  iconWrapper: {
    marginRight: Metrics.baseMargin,
  },
});
