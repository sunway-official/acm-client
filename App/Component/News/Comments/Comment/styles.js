import { StyleSheet } from 'react-native';
import { Colors, Metrics } from '~/Theme';

const { baseMargin, doubleBaseMargin, doubleSection } = Metrics;
const { grey } = Colors;

export default StyleSheet.create({
  commentContainer: {
    flexDirection: 'row',
    marginVertical: doubleBaseMargin,
  },
  rightOfComment: { flex: 1, marginLeft: baseMargin },
  rightFooterOfComment: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: baseMargin,
  },
  interactionContainer: { flexDirection: 'row', alignItems: 'center' },
  textColor: { color: grey }, // additional text (an houre ago, ...)
  replyTextStyle: { color: grey, marginRight: 28 },
  commentInputBoxContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: baseMargin,
  },
  commentInputBox: {
    flex: 1,
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: doubleSection,
    borderColor: 'grey',
    marginLeft: doubleBaseMargin,
    height: 40,
  },
  textInputStyle: { flex: 1, paddingHorizontal: doubleBaseMargin },
  commentSubmitButton: {
    justifyContent: 'center',
    paddingHorizontal: doubleBaseMargin,
  },
});
