import HomeScreen from './screens/HomeScreen';

import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaView style={{
        flex:1,
      }}>
        <Stack.Navigator
          initialRouteName='HomeScreen'
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name='HomeScreen' component={HomeScreen} />
        </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
}
