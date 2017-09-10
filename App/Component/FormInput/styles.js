import { StyleSheet } from 'react-native';
import { Colors, Fonts } from '~/Theme/';

const styles = StyleSheet.create({
  textInput: {
    height: 48,
    borderBottomWidth: 1,
    borderColor: Colors.lightGrey,
  },
  warningText: {
    color: Colors.warning,
    fontSize: Fonts.size.small,
    borderTopWidth: 1,
    borderColor: Colors.warning,
    paddingTop: 5,
  },
  errorText: {
    color: Colors.danger,
    fontSize: Fonts.size.small,
    borderTopWidth: 1,
    borderColor: Colors.danger,
    paddingTop: 5,
  },
});

export default styles;
