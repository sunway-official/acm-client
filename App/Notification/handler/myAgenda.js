import { Notifications } from 'expo';
import { AsyncStorage } from 'react-native';

/**
 * Async & Await handler for My Agenda Local Notification
 * Author: Tri Pham
 */

const STORAGE_KEY = 'MY_AGENDA_LOCAL_NOTIFICATIONS';
const NOTIFICATION_CONFIG = {
  ios: {
    sound: true,
  },
  android: {
    sound: true,
    priority: 'high',
    sticky: false,
    vibrate: true,
  },
};

const setLocalNotificationSchedule = async activity => {
  // Set up notification
  const localNotification = {
    ...NOTIFICATION_CONFIG,
    title: activity.title,
    body: activity.shortDescription,
  };
  const schedulingOptions = {
    time: activity.time,
  };
  let notificationId = null;
  // Register if activity is NOT in the past
  if (schedulingOptions.time > new Date()) {
    notificationId = await Notifications.scheduleLocalNotificationAsync(
      localNotification,
      schedulingOptions,
    );
  }
  return notificationId;
};

const cancelLocalNotification = async () => {
  // Get & parse notification ID from storage
  let notifications = (await AsyncStorage.getItem(STORAGE_KEY)) || '[]';
  notifications = JSON.parse(notifications)[0] || [];
  // Cancel Expo Local Notifications
  await Promise.all(
    notifications.map(id => Notifications.cancelScheduledNotificationAsync(id)),
  );
};

export default async data => {
  // Cancel old schedules from from async storage
  await cancelLocalNotification();
  // Register new schedules
  const notifications = await Promise.all(
    data.map(({ activities }) =>
      Promise.all(activities.map(setLocalNotificationSchedule)),
    ),
  );
  // Save schedule id to storage
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(notifications));
};
