import { StyleSheet } from 'react-native';
import { Colors } from '../../Theme';

export default StyleSheet.create({
  container: {},
  inputForm: {
    borderBottomWidth: 1,
    padding: 8,
    paddingLeft: 0,
  },
  errorText: {
    color: Colors.red,
    marginTop: 8,
  },
  warningText: {
    color: Colors.yellow,
  },
});
