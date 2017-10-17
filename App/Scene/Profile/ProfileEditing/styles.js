import { StyleSheet } from 'react-native';
import { Colors, Metrics } from '~/Theme';

const { baseMargin } = Metrics;
const { white } = Colors;

export default StyleSheet.create({
  container: {
    margin: baseMargin,
    backgroundColor: white,
    zIndex: 1,
    position: 'relative',
  },
  mutationLoading: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.03)',
    position: 'absolute',
    zIndex: 2,
    display: 'flex',
    justifyContent: 'center',
  },
});
