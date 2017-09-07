import { StyleSheet } from 'react-native';
import { Metrics, Fonts } from '~/Theme';

export default StyleSheet.create({
  footer: {
    flexDirection: 'row',
    height: 56,
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
