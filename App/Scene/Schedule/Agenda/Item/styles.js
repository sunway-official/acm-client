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
  timeWrapper: {
    width: 56,
    justifyContent: 'center',
    marginHorizontal: Metrics.doubleBaseMargin,
  },
  infoWrapper: {
    marginHorizontal: Metrics.doubleBaseMargin,
    flex: 1,
  },
  primaryText: {
    color: Colors.black,
  },
  secondaryText: {
    color: Colors.grey,
  },
});
