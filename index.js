import { AppRegistry } from 'react-native';
import SmartHomeApp from './src/SmartHomeApp';
import { name as appName } from './app.json';

if (__DEV__) {
	import('@/reactotron.config');
}

AppRegistry.registerComponent(appName, () => SmartHomeApp);