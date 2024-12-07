import { AppRegistry } from 'react-native';

import { name as appName } from './app.json';
import SmartHomeApp from './src/SmartHomeApp';

if (__DEV__) {
	import('@/reactotron.config');
}

AppRegistry.registerComponent(appName, () => SmartHomeApp);