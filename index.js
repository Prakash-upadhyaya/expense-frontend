/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { registerForegroundHandler } from './src/firbase/notification';
registerForegroundHandler();
AppRegistry.registerComponent(appName, () => App);
