import { StyleSheet } from 'react-native';
import { Metrics, Colors } from 'Theme';
import { IS_ANDROID } from 'env';

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
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.075)',
    borderRadius: 2,
  },
  item: {
    flexDirection: 'row',
    paddingVertical: Metrics.doubleBaseMargin,
    paddingHorizontal: Metrics.doubleBaseMargin,
    alignItems: 'center',
  },
  iconWrapper: {
    marginRight: Metrics.doubleBaseMargin,
  },
});
