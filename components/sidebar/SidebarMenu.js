import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import data from '../../data';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { close } from '../../redux/reducer/sidebarSlice';

export default function SidebarMenu() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const menuData = data.menu;
  return (
    <View style={styles.container}>
      {menuData.map((menu, index) => {
        return (
          <TouchableOpacity
            style={styles.menuItem}
            key={index}
            onPress={() => {
              dispatch(close());
              navigation.navigate(menu.screen);
            }}
          >
            <Icon name={menu.icon} size={25} color='#fff' />
            <Text style={styles.menuText}>{menu.name}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 10,
    flexWrap: 'wrap',
    paddingTop: 40,
  },
  menuItem: {
    alignItems: 'center',
    width: '33%',
    paddingBottom: 20,
  },
  menuText: {
    color: '#fff',
  },
});
