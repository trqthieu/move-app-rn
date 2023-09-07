import HomeScreen from './screens/HomeScreen';

import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import store from './redux/store';
import MovieDetailScreen from './screens/MovieDetailScreen';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaView
          style={{
            flex: 1,
          }}
        >
          <Stack.Navigator
            initialRouteName='MovieDetailScreen'
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name='HomeScreen' component={HomeScreen} />
            <Stack.Screen
              name='MovieDetailScreen'
              component={MovieDetailScreen}
            />
          </Stack.Navigator>
        </SafeAreaView>
      </NavigationContainer>
    </Provider>
  );
}
