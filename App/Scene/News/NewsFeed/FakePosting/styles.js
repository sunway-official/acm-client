import { StyleSheet } from 'react-native';
import { Colors, Metrics } from '~/Theme';

const { white, grey } = Colors;

export default StyleSheet.create({
  container: {
    marginHorizontal: Metrics.baseMargin,
    padding: Metrics.baseMargin,
    marginBottom: Metrics.baseMargin,
    backgroundColor: white,
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusBoxView: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: Metrics.baseMargin,
    marginHorizontal: Metrics.baseMargin,
  },
  placeholderStyle: { color: grey },
});
