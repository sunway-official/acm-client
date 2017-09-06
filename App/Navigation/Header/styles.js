import { StyleSheet } from 'react-native';
import { Colors, Metrics, Fonts } from '../../Theme';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
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
    fontWeight: Fonts.type.bold,
    fontSize: Fonts.size.regular,
  },
  relativeContainer: {
    position: 'relative',
  },
  backdrop: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
});
