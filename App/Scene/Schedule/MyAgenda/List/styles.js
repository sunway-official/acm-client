import { StyleSheet } from 'react-native';
import { Colors } from '~/Theme';

const Schedule = StyleSheet.create({
  container: {
    flex: 1,
  },
  verticalLine: {
    position: 'absolute',
    left: 62,
    borderLeftWidth: 2,
    borderLeftColor: Colors.lightGrey,
    height: '100%',
  },
});

export default Schedule;
