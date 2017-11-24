import { StyleSheet } from 'react-native';
import { Colors } from '~/Theme';

const Schedule = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  emptyText: {
    color: Colors.grey,
  },
});

export default Schedule;
