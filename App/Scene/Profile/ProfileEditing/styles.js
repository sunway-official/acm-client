import { StyleSheet } from 'react-native';
import { Colors, Metrics } from '../../../Theme';

const { baseMargin, doubleBaseMargin } = Metrics;
const { white, primary } = Colors;

const ProfileEditing = StyleSheet.create({
  container: {
    margin: baseMargin,
    backgroundColor: white,
  },
  formContainer: { padding: baseMargin },
  inputContainer: { marginBottom: doubleBaseMargin },
  submitBtn: {
    backgroundColor: primary,
    padding: baseMargin,
  },
  submitTitle: {
    textAlign: 'center',
    color: white,
  },
});

export default ProfileEditing;
