import { StyleSheet } from 'react-native';
import { Colors, Metrics } from 'Theme';

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
    position: 'absolute',
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255,255,255,0.8)',
    justifyContent: 'center',
  },
});
