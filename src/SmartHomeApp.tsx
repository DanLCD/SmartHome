import { ThemeProvider, useTheme } from '@/theme';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Provider } from "react-redux";
import Home from '@/screens/Home/Home';
import Places from '@/screens/Places/Places';
import { store, StoreContext } from '@/services/store';

import './translations';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MMKV } from 'react-native-mmkv';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { setup, sync } from '@/services/net';
import { RootStackParamList } from './types/navigation';

const Stack = createStackNavigator<RootStackParamList>();

export const queryClient = new QueryClient();

export const storage = new MMKV();

setup()
sync().catch(e => console.error(e))

const ApplicationNavigator = () => {
	const { variant, navigationTheme } = useTheme();

	return (
		<SafeAreaProvider>
			<NavigationContainer theme={navigationTheme}>
				<Stack.Navigator key={variant} screenOptions={{ headerShown: false }}>
					<Stack.Screen name="Home" component={Home} />
					<Stack.Screen name="Places" component={Places} />
				</Stack.Navigator>
			</NavigationContainer>
		</SafeAreaProvider>
	);
}

const App = () => (
	<Provider store={store} context={StoreContext}>
		<QueryClientProvider client={queryClient}>
			<ThemeProvider storage={storage}>
				<ApplicationNavigator />
			</ThemeProvider>
		</QueryClientProvider>
	</Provider>
);

export default App;
