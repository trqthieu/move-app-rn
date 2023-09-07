import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import data from '../../data';

export default function SidebarMenu() {
  const menuData = data.menu;
  return (
    <View style={styles.container}>
      {menuData.map(menu => (
        <View style={styles.menuItem}>
          <Icon name={menu.icon} size={25} color='#fff' />
          <Text style={styles.menuText}>{menu.name}</Text>
        </View>
      ))}
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
