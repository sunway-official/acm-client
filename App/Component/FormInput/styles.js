import { StyleSheet } from 'react-native';
import { Colors, Metrics } from 'Theme';

export default StyleSheet.create({
  container: {},
  inputForm: {
    borderBottomWidth: 1,
    padding: Metrics.baseMargin,
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
