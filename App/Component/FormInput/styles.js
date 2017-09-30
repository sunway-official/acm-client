import { StyleSheet } from 'react-native';
import { Colors, Fonts, Metrics } from '~/Theme/';

const styles = StyleSheet.create({
  textInput: {
    paddingVertical: Metrics.baseMargin,
  },
  defaultText: {
    borderTopWidth: 0.8,
  },
  warningText: {
    color: Colors.warning,
    fontSize: Fonts.size.small,
    borderTopWidth: 0.8,
    paddingTop: Metrics.baseMargin,
  },
  errorText: {
    color: Colors.danger,
    fontSize: Fonts.size.small,
    borderTopWidth: 0.8,
    paddingTop: Metrics.baseMargin,
  },
});

export default styles;
