import { StyleSheet } from 'react-native';
import { Metrics, Colors } from '../../../../Theme';

const { baseMargin } = Metrics;
const { white } = Colors;

export default StyleSheet.create({
  modalContainer: {
    alignItems: 'center',
  },
  modalContent: { backgroundColor: white, padding: baseMargin, width: '75%' },
  subContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: baseMargin,
  },
});
