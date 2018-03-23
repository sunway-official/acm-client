import { StyleSheet } from 'react-native';
import { Metrics, Fonts, Colors } from 'Theme';

export default StyleSheet.create({
  notificationListContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: Colors.white,
    padding: Metrics.doubleBaseMargin,
    borderBottomColor: Colors.lightGrey,
    borderBottomWidth: 1,
  },
  leftNotificationListContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    marginRight: Metrics.doubleBaseMargin,
  },
  rightNotificationListContainer: { paddingRight: Metrics.baseMargin },
  notificationContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginRight: Metrics.baseMargin,
  },
  heading: {
    fontWeight: 'bold',
  },
  createdAt: {
    fontSize: Fonts.size.small,
  },
});
