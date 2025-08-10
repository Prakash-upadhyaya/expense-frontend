import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';

export async function requestPermission() {
  try {
    const status = await messaging().requestPermission();

    const auth =
      status == messaging.AuthorizationStatus.AUTHORIZED ||
      status == messaging.AuthorizationStatus.PROVISIONAL;
    if (auth) {
      console.log('Authorization status:', auth);
      getToken();
    }
  } catch (error) {
    console.log('Error requesting permission:', error);
  }
}

async function getToken() {
  try {
    const token = await AsyncStorage.getItem('FCM_TOKEN');

    if (!token) {
      const fcmToken = await messaging().getToken();
      if (fcmToken) {
        console.log('---> NEW FCM TOKEN --->', fcmToken);
        await AsyncStorage.setItem('FCM_TOKEN', fcmToken);
      } else {
        console.log('---> FCM TOKEN NOT FOUND --->');
      }
    } else {
      console.log('---> FCM TOKEN ALREADY EXISTS --->', token);
    }
  } catch (error) {
    console.log('Error getting FCM token:', error);
  }
}

export const NotificationListner = () => {
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );
  });

  // Check whether an initial notification is available
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
      }
    });
};

export function registerForegroundHandler() {
  const subscribe = messaging().onMessage(async remoteMessage => {
    console.log('Foreground message received:', remoteMessage);

    PushNotification.localNotification({
      channelId: '1234',
      title: remoteMessage.data?.title || remoteMessage.notification?.title,
      message: remoteMessage.data?.body || remoteMessage.notification?.body,
      playSound: true,
      soundName: 'default',
      priority: 'high',
    });
  });

  return () => {
    subscribe();
  };
}
