import { StyleSheet } from 'react-native';
import { Colors, Metrics } from '../../../../../../Theme';

const Comment = StyleSheet.create({
  commentContainer: {
    flexDirection: 'row',
    marginVertical: Metrics.doubleBaseMargin,
  },
  rightOfComment: { flex: 1, marginLeft: Metrics.doubleBaseMargin },
  rightFooterOfComment: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Metrics.baseMargin,
  },
  interactionContainer: { flexDirection: 'row', alignItems: 'center' },
  textColor: { color: Colors.grey }, // additional text
  replyTextStyle: { color: Colors.grey, marginRight: 28 },
  commentInputBoxContainer: {
    flex: 1,
    flexDirection: 'row',
    height: Metrics.doubleSection,
    marginHorizontal: -Metrics.baseMargin,
    marginTop: Metrics.baseMargin,
    marginBottom: -Metrics.baseMargin,
    backgroundColor: Colors.primaryLight,
  },
  textInputStyle: { flex: 1, paddingHorizontal: Metrics.baseMargin },
  commentSubmitButton: {
    justifyContent: 'center',
    backgroundColor: Colors.primaryDark,
    paddingHorizontal: 20,
  },
});

export default Comment;
