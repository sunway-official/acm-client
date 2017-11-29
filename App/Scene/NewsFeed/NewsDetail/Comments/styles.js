import { StyleSheet } from 'react-native';
import { Metrics, Colors } from '~/Theme';

const { baseMargin, doubleBaseMargin, smallMargin } = Metrics;

export default StyleSheet.create({
  commentInputBoxContainer: {
    flexShrink: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    paddingHorizontal: baseMargin,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.075)',
  },
  commentInputBox: {
    flex: 1,
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: Metrics.baseMargin,
    borderColor: Colors.grey,
    marginLeft: baseMargin,
    marginBottom: smallMargin,
    alignItems: 'center',
  },
  textInputStyle: {
    flex: 1,
    paddingHorizontal: doubleBaseMargin,
    paddingVertical: baseMargin,
    fontSize: 14,
  },
  commentSubmitButton: {
    justifyContent: 'center',
    paddingHorizontal: doubleBaseMargin,
  },
  sendCommentBtn: {
    color: Colors.grey,
    padding: baseMargin,
  },
});
