import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';

const MessageHandler = () => {
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));

      try {
        PushNotification.localNotification({
          channelId: '1234',
          vibrate: true,
          actions: ['Yes', 'No'],
          title: remoteMessage?.notification?.title,
          message: remoteMessage?.notification?.body,
          soundName: 'default',
          ignoreInForeground: false,
        });
      } catch (error) {
        console.log(error);
      }
    });

    return unsubscribe;
  }, []);

  return null;
};

export default MessageHandler;
