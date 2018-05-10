import { StyleSheet } from 'react-native';
import { Colors, Metrics } from 'Theme';

const { baseMargin, smallMargin } = Metrics;
const { white, grey, red } = Colors;

export default StyleSheet.create({
  container: {
    marginBottom: baseMargin,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: white,
    padding: baseMargin,
  },
  leftTopCommentUsersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightTopCommentUsersContainer: { paddingRight: baseMargin },
  numberOfTopCommentUsersText: {
    color: grey,
    fontSize: 12,
    marginTop: smallMargin,
  },
  badgeContainer: {
    borderWidth: 1,
    borderColor: red,
  },
});
