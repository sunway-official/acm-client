import { StyleSheet } from 'react-native';
import { Colors } from '~/Theme';
import { Metrics, Fonts } from '../../../../Theme/index';

const sceneHeight =
  Metrics.screenHeight - Metrics.toolBarHeight - Metrics.statusBarHeight;

export default StyleSheet.create({
  background: {
    minHeight: sceneHeight / 2.2,
    backgroundColor: Colors.black,
  },
  container: {
    justifyContent: 'flex-end',
    flex: 1,
  },
  text: {
    color: Colors.white,
  },
  titleText: {
    fontSize: Fonts.size.h6,
  },
  infoContainer: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: Metrics.baseMargin,
  },
});
