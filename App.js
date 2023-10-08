import HomeScreen from './screens/HomeScreen';

import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer, useRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import store from './redux/store';
import MovieDetailScreen from './screens/MovieDetailScreen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BookingCinemaScreen from './screens/BookingCinemaScreen';
import BookingChairScreen from './screens/BookingChairScreen';
import BookingFoodScreen from './screens/BookingFoodScreen';
import InvoiceScreen from './screens/InvoiceScreen';
import BankScreen from './screens/BankScreen';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';
import CheckoutDoneScreen from './screens/CheckoutDoneScreen';
import MyTicketScreen from './screens/MyTicketScreen';
import { BackHandler, Alert } from 'react-native';
import { useEffect } from 'react';
const Stack = createNativeStackNavigator();

export default function App() {
  // const route = useRoute();
  // useEffect(() => {
  //   // Add a listener for the hardware back button
  //   const backHandler = BackHandler.addEventListener(
  //     'hardwareBackPress',
  //     () => {
  //       Alert.alert(
  //         'Thoát ứng dụng',
  //         'Bạn có chắc muốn thoát ứng dụng CGV không?',
  //         [
  //           { text: 'Hủy', onPress: () => {}, style: 'cancel' },
  //           {
  //             text: 'Đồng ý',
  //             onPress: () => {
  //               BackHandler.exitApp();
  //             },
  //           },
  //         ],
  //         { cancelable: false }
  //       );
  //       return true;
  //     }
  //   );
  //   return () => {
  //     backHandler.remove();
  //   };
  // }, []);
  return (
    <GestureHandlerRootView
      style={{
        flex: 1,
      }}
    >
      <Provider store={store}>
        <NavigationContainer>
          <SafeAreaView
            style={{
              flex: 1,
            }}
          >
            <Stack.Navigator
              initialRouteName='LoginScreen'
              screenOptions={{
                headerShown: false,
              }}
            >
              <Stack.Screen name='HomeScreen' component={HomeScreen} />
              <Stack.Screen
                name='MovieDetailScreen'
                component={MovieDetailScreen}
              />
              <Stack.Screen
                name='BookingCinemaScreen'
                component={BookingCinemaScreen}
              />
              <Stack.Screen
                name='BookingChairScreen'
                component={BookingChairScreen}
              />
              <Stack.Screen
                name='BookingFoodScreen'
                component={BookingFoodScreen}
              />
              <Stack.Screen name='InvoiceScreen' component={InvoiceScreen} />
              <Stack.Screen name='BankScreen' component={BankScreen} />
              <Stack.Screen
                name='CheckoutDoneScreen'
                component={CheckoutDoneScreen}
              />
              <Stack.Screen name='LoginScreen' component={LoginScreen} />
              <Stack.Screen name='RegisterScreen' component={RegisterScreen} />
              <Stack.Screen name='MyTicketScreen' component={MyTicketScreen} />
            </Stack.Navigator>
          </SafeAreaView>
        </NavigationContainer>
      </Provider>
    </GestureHandlerRootView>
  );
}
