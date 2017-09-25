import { StyleSheet } from 'react-native';
import { Colors, Metrics, Fonts } from '../../../../Theme';

const Detail = StyleSheet.create({
  container: {
    // paddingHorizontal: baseMargin,
    backgroundColor: Colors.white,
    flex: 1,
  },
  verticalLine: {
    position: 'absolute',
    left: 44,
    borderLeftWidth: 2,
    borderLeftColor: Colors.lightGrey,
    height: '100%',
  },
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
    // width: 24 + 4,
    backgroundColor: Colors.white,
    borderRadius: 13,
  },
  timeWrapper: {
    width: 48,
    justifyContent: 'center',
    marginHorizontal: Metrics.doubleBaseMargin,
  },
  infoWrapper: {
    marginHorizontal: Metrics.doubleBaseMargin,
    flex: 1,
  },
  actionWrapper: {
    marginLeft: 'auto',
    marginRight: Metrics.doubleBaseMargin * 2,
    justifyContent: 'center',
  },
  primaryText: {
    color: Colors.black,
  },
  secondaryText: {
    color: Colors.grey,
  },
});

export default Detail;
