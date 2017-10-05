import { StyleSheet } from 'react-native';
import { Metrics } from '~/Theme';
export default StyleSheet.create({
  footer: {
    flexDirection: 'row',
    height: Metrics.toolBarHeight,
  },
  tabWrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  backdrop: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
});
