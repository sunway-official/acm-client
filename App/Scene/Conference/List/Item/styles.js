import { StyleSheet } from 'react-native';
import { Colors, Metrics, Fonts } from '~/Theme';

const sceneHeight =
  Metrics.screenHeight - Metrics.toolBarHeight - Metrics.statusBarHeight;

export default StyleSheet.create({
  background: {
    minHeight: sceneHeight / 2.5,
    backgroundColor: Colors.black,
  },
  backdropContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.225)',
  },
  container: {
    justifyContent: 'flex-end',
    flex: 1,
  },
  text: {
    color: Colors.white,
    backgroundColor: Colors.transparent,
  },
  titleText: {
    fontSize: Fonts.size.h6,
  },
  infoContainer: {
    padding: Metrics.baseMargin,
  },
  actionsContainer: {
    position: 'absolute',
    right: Metrics.baseMargin,
    top: 0,
    flexDirection: 'row',
  },
  actionWrapper: {
    paddingVertical: Metrics.doubleBaseMargin,
    paddingHorizontal: Metrics.baseMargin,
    width: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionText: {
    fontSize: Fonts.size.small,
    backgroundColor: Colors.transparent,
  },
});
