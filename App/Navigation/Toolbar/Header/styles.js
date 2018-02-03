import { StyleSheet } from 'react-native';
import { Metrics, Fonts } from 'Theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  header: {
    height: Metrics.toolBarHeight,
  },
  centerWrapper: {
    marginLeft: Metrics.baseMargin,
  },
  rightWrapper: {
    marginLeft: 'auto',
    flexDirection: 'row-reverse',
  },
  iconWrapper: {
    padding: Metrics.doubleBaseMargin,
  },
  rightIconWrapper: {
    paddingVertical: Metrics.doubleBaseMargin,
    paddingHorizontal: Metrics.baseMargin,
  },
  firstRightIcon: {
    paddingRight: Metrics.doubleBaseMargin,
  },
  titleWrapper: {
    marginTop: 'auto',
    marginBottom: 18,
  },
  title: {
    fontSize: Fonts.size.regular,
  },
  backdrop: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
});
