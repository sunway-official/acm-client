import { Notifications } from 'expo';
import { AsyncStorage } from 'react-native';
import { transformServerDate } from '~/Transformer';
/**
 * Async & Await handler for My Agenda Local Notification
 * Author: Tri Pham
 */

const STORAGE_KEY = 'MY_AGENDA_LOCAL_NOTIFICATIONS';
const DEFAULT_NOTIFICATION_ID = 0;
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
const setLocalNotificationSchedule = async item => {
  // Set up notification
  const localNotification = {
    ...NOTIFICATION_CONFIG,
    title: item.activity.title,
    body: item.schedule.room.name || '',
  };
  const schedulingOptions = {
    time: new Date(transformServerDate.toLocal(item.schedule.start)).getTime(),
  };
  let notificationId = DEFAULT_NOTIFICATION_ID;
  // Register if item is NOT in the past
  if (schedulingOptions.time > new Date().getTime()) {
    notificationId = await Notifications.scheduleLocalNotificationAsync(
      localNotification,
      schedulingOptions,
    );
  }
  return notificationId;
};

const cancelLocalNotification = async () => {
  // Get & parse notification ID from storage
  const data = await AsyncStorage.getItem(STORAGE_KEY);
  let notifications = data || '[]';
  notifications = JSON.parse(notifications) || [];
  // Cancel Expo Local Notifications
  await Promise.all(
    notifications.map(item =>
      item.map(id => Notifications.cancelScheduledNotificationAsync(id)),
    ),
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
