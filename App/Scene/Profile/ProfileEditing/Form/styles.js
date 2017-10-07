import { StyleSheet } from 'react-native';
import { Colors, Metrics } from '~/Theme';

const { baseMargin, doubleBaseMargin } = Metrics;
const { white, primary } = Colors;

export default StyleSheet.create({
  formContainer: { padding: baseMargin },
  inputContainer: { marginBottom: doubleBaseMargin, flexDirection: 'row' },
  submitBtn: {
    marginTop: doubleBaseMargin,
    backgroundColor: primary,
    padding: baseMargin,
  },
  submitTitle: {
    textAlign: 'center',
    color: white,
  },
});
