import { ThemeProvider, useTheme } from '@/theme';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Provider } from "react-redux";
import IndexComponent from './components/IndexComponent/IndexComponent';
import PlacesComponent from './components/PlacesComponent/PlacesComponent';
import { store, StoreContext } from './components/store';

import './translations';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MMKV } from 'react-native-mmkv';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { fetchAccessories, getPlaces } from './components/actions';
import { RootStackParamList } from './types/navigation';

const Stack = createStackNavigator<RootStackParamList>();

export const queryClient = new QueryClient();

export const storage = new MMKV();

getPlaces();
fetchAccessories();


const ApplicationNavigator = () => {
	const { variant, navigationTheme } = useTheme();

	return (
		<SafeAreaProvider>
			<NavigationContainer theme={navigationTheme}>
				<Stack.Navigator key={variant} screenOptions={{ headerShown: false }}>
					<Stack.Screen name="Home" component={IndexComponent} />
					<Stack.Screen name="Places" component={PlacesComponent} />
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
