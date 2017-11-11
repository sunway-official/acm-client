import { StyleSheet } from 'react-native';
import { Colors, Metrics } from '~/Theme';

const { baseMargin, smallMargin } = Metrics;
const { white, grey, red } = Colors;

export default StyleSheet.create({
  container: {
    marginBottom: baseMargin,
  },
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
  badgeContainer: {
    borderWidth: 1,
    borderColor: red,
  },
});
