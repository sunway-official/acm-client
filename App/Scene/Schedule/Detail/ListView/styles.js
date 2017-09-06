import { StyleSheet } from 'react-native';
import { Colors } from '../../../../Theme';

const Detail = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderTopWidth: 0.5,
    borderTopColor: Colors.grey,
  },
  item: {
    backgroundColor: Colors.white,
    paddingHorizontal: 8,
    paddingVertical: 4,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default Detail;
