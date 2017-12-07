import { StyleSheet } from 'react-native';
import { Colors, Metrics } from '~/Theme';

export default StyleSheet.create({
  item: {
    flexDirection: 'row',
    paddingVertical: Metrics.doubleBaseMargin,
  },
  iconWrapper: {
    marginLeft: 32,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    backgroundColor: Colors.white,
    borderRadius: 13,
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  timeWrapper: {
    width: 90,
    justifyContent: 'center',
    paddingRight: Metrics.doubleBaseMargin,
    paddingLeft: Metrics.baseMargin,
  },
  infoWrapper: {
    flex: 1,
    paddingRight: Metrics.baseMargin,
  },
  primaryText: {
    color: Colors.black,
  },
  secondaryText: {
    color: Colors.grey,
  },
  blurItem: {
    opacity: 0.3,
  },
});
