import { StyleSheet } from 'react-native';
import { Metrics, Fonts, Colors } from 'Theme';

const { baseMargin, doubleBaseMargin } = Metrics;
const { white, lightGrey } = Colors;
const { size } = Fonts;

export default StyleSheet.create({
  notificationListContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: white,
    padding: doubleBaseMargin,
    borderBottomColor: lightGrey,
    borderBottomWidth: 1,
  },
  leftNotificationListWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    marginRight: doubleBaseMargin,
  },
  rightNotificationListWrapper: { paddingRight: doubleBaseMargin },
  notificationContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  heading: {
    fontWeight: 'bold',
  },
  createdAt: {
    fontSize: size.small,
  },
});
