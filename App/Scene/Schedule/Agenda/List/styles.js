import { StyleSheet } from 'react-native';
import { Colors } from 'Theme';

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  verticalLine: {
    position: 'absolute',
    left: 44,
    borderLeftWidth: 2,
    borderLeftColor: Colors.lightGrey,
    marginVertical: '3%',
    height: '94%',
  },
});
