import { StyleSheet } from 'react-native';
import { Colors, Metrics } from '../../../../../Theme';

const { baseMargin, smallMargin } = Metrics;
const { white, grey, red } = Colors;

const Followers = StyleSheet.create({
  followerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: white,
    padding: baseMargin,
  },
  leftOfFollowerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
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

export default Followers;
