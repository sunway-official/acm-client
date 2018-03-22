import { StyleSheet } from 'react-native';
import { Metrics, Fonts, Colors } from 'Theme';

export default StyleSheet.create({
  notificationListContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: Colors.white,
    padding: Metrics.doubleBaseMargin,
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
  username: {},
  content: {
    // paddingRight: Metrics.baseMargin,
  },
  createdAt: {
    fontSize: Fonts.size.small,
  },
});
