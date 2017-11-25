import { StyleSheet } from 'react-native';
import { Metrics } from '~/Theme';

const { baseMargin, doubleBaseMargin, doubleSection } = Metrics;

export default StyleSheet.create({
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
    borderColor: '#bdc3c7',
    marginLeft: doubleBaseMargin,
    height: 40,
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
    color: '#bdc3c7',
    padding: baseMargin,
  },
});
