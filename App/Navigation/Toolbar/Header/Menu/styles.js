import { StyleSheet } from 'react-native';
import { Metrics, Colors } from '~/Theme';

export default StyleSheet.create({
  modal: {
    position: 'absolute',
    top: Metrics.baseMargin,
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
