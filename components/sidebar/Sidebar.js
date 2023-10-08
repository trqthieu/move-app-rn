import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { close } from '../../redux/reducer/sidebarSlice';
import UserInfo from './UserInfo';
import SidebarMenu from './SidebarMenu';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Sidebar() {
  const navigation = useNavigation();
  const handleLogout = async () => {
    await AsyncStorage.removeItem('accessToken');
    navigation.navigate('LoginScreen');
    dispatch(close());
  };
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <UserInfo />
        <SidebarMenu />
        <Pressable onPress={handleLogout}>
          <Text style={styles.btnLogout}>Đăng xuất</Text>
        </Pressable>
      </View>
      <Pressable
        onPress={() => dispatch(close())}
        style={styles.close}
      ></Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    position: 'absolute',
    right: 0,
    top: 0,
    height: '100%',
    width: '100%',
  },
  content: {
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.9)',
    position: 'absolute',
    width: '80%',
    right: 0,
  },
  close: {
    height: '100%',
    position: 'absolute',
    width: '30%',
    left: 0,
  },
  btnLogout: {
    textAlign: 'center',
    color: '#fff',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
});
