import { StyleSheet } from 'react-native';
import { Colors, Metrics } from 'Theme';

const { baseMargin, smallMargin } = Metrics;
const { white, grey } = Colors;

export default StyleSheet.create({
  followerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: white,
    padding: baseMargin,
  },
  leftFollowerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightFollowerContainer: { paddingRight: baseMargin },
  numberOfFollowerText: {
    color: grey,
    fontSize: 12,
    marginTop: smallMargin,
  },
});
