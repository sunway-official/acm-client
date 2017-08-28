import { StyleSheet } from 'react-native';
import { Colors } from '../Theme';
import { Constants } from 'expo';

export default StyleSheet.create({
  header: {
    borderTopWidth: Constants.statusBarHeight,
    borderTopColor: Colors.primaryDark, // StatusBar color
  },
  container: {
    flex: 1,
    position: 'relative',
  },
  loadingContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
