import { StyleSheet } from 'react-native';
import { Colors, Metrics } from '../../../../../../Theme';

const { baseMargin, doubleBaseMargin, doubleSection } = Metrics;
const { primaryLight, primaryDark, grey } = Colors;

const Comment = StyleSheet.create({
  commentContainer: {
    flexDirection: 'row',
    marginVertical: doubleBaseMargin,
  },
  rightOfComment: { flex: 1, marginLeft: doubleBaseMargin },
  rightFooterOfComment: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: baseMargin,
  },
  interactionContainer: { flexDirection: 'row', alignItems: 'center' },
  textColor: { color: grey }, // additional text
  replyTextStyle: { color: grey, marginRight: 28 },
  commentInputBoxContainer: {
    flex: 1,
    flexDirection: 'row',
    height: doubleSection,
    marginHorizontal: -baseMargin,
    marginTop: baseMargin,
    marginBottom: -baseMargin,
    backgroundColor: primaryLight,
  },
  textInputStyle: { flex: 1, paddingHorizontal: baseMargin },
  commentSubmitButton: {
    justifyContent: 'center',
    backgroundColor: primaryDark,
    paddingHorizontal: 20,
  },
});

export default Comment;
