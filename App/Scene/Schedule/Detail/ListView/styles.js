import { StyleSheet } from 'react-native';
import { Colors } from '../../../../Theme';

const Detail = StyleSheet.create({
  container: {
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginBottom: 1,
  },
});

export default Detail;
