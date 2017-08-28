import { StyleSheet } from 'react-native';
import { Colors } from '../Theme';
import { Constants } from 'expo';

export default StyleSheet.create({
  statusBar: {
    borderTopWidth: Constants.statusBarHeight,
    borderTopColor: Colors.primaryDark, // StatusBar color
  },
  container: {
    flex: 1,
  },
});
