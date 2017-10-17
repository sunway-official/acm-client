import { StyleSheet } from 'react-native';
import { Colors, Metrics } from '~/Theme';

const { white, lightGrey } = Colors;

export default StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: white,
    margin: 0,
  },
  modalHeader: {
    flex: 0.5,
    flexDirection: 'row',
    backgroundColor: lightGrey,
    borderBottomWidth: 0.5,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Metrics.doubleBaseMargin,
    paddingHorizontal: Metrics.doubleBaseMargin,
  },
  modalContent: {
    flex: 8,
    flexDirection: 'column',
    paddingVertical: Metrics.doubleBaseMargin,
    paddingHorizontal: Metrics.doubleBaseMargin,
  },
  modalContentUserInformation: {
    flexDirection: 'row',
  },
  modalContentUsername: {
    marginLeft: Metrics.baseMargin,
  },
  modalAction: {
    flex: 1.5,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});
