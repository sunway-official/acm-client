import { StyleSheet } from 'react-native';
import { Metrics, Colors, Fonts } from 'Theme';

const { baseMargin, doubleBaseMargin } = Metrics;

const INPUT_HEIGHT = 40;

export default StyleSheet.create({
  commentsContainer: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.045)',
  },
  commentInputBoxContainer: {
    flexShrink: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: INPUT_HEIGHT,
    paddingHorizontal: baseMargin,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.075)',
  },
  commentInputBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: INPUT_HEIGHT / 2,
    borderColor: Colors.grey,
    marginLeft: baseMargin,
  },
  textInputStyle: {
    flex: 1,
    paddingHorizontal: doubleBaseMargin,
    fontSize: Fonts.size.medium,
  },
  commentSubmitButton: {
    justifyContent: 'center',
    paddingHorizontal: baseMargin,
  },
  sendCommentBtn: {
    color: Colors.grey,
    padding: baseMargin,
  },
});
