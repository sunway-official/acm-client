import { StyleSheet } from 'react-native';
import { Colors, Metrics } from '~/Theme';

const { baseMargin, doubleBaseMargin } = Metrics;
const { grey } = Colors;

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: doubleBaseMargin,
  },
  commentContainer: {
    flex: 1,
    marginLeft: baseMargin,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textColor: {
    color: grey,
  }, // additional text (an houre ago, ...)
});
