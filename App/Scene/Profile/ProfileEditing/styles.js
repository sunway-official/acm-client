import { StyleSheet } from 'react-native';
import { Colors, Metrics } from '~/Theme';

const { baseMargin } = Metrics;
const { white } = Colors;

export default StyleSheet.create({
  container: {
    margin: baseMargin,
    backgroundColor: white,
  },
});
