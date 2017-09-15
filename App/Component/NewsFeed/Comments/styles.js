import { StyleSheet } from 'react-native';
import { Colors, Metrics } from '../../../Theme';

const { baseMargin, doubleBaseMargin, doubleSection } = Metrics;
const { grey } = Colors;

const Comments = StyleSheet.create({
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
    borderColor: grey,
    marginLeft: doubleBaseMargin,
    height: 40,
  },
  textInputStyle: { flex: 1, paddingHorizontal: doubleBaseMargin },
  commentSubmitButton: {
    justifyContent: 'center',
    paddingHorizontal: doubleBaseMargin,
  },
});

export default Comments;
