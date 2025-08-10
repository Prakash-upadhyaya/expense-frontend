import { Alert, Button, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import {
  NotificationListner,
  requestPermission,
} from './src/firbase/notification';

import MessageHandler from './src/firbase/MessageHandler';
import PushNotification from 'react-native-push-notification';
import axios from 'axios';
const App = () => {
  useEffect(() => {
    PushNotification.createChannel(
      {
        channelId: '1234',
        channelName: 'Test Notification',
      },
      created => console.log('----> CHANNNEL CREATED', created),
    );
    requestPermission();
    NotificationListner();
  }, []);

  async function generateNotification() {
    try {
      const url = 'http://192.168.1.35:8000/login';
      const response = await axios.get<any, any>(url); // replace to post to send  token dynamically
      console.log('=======>>', response);
    } catch (error) {
      console.log('====>', error);
    }
  }
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <MessageHandler />
      <Text>App</Text>
      <Button title="Click me" onPress={generateNotification} />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({});
