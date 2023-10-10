import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import data from '../../data';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { close } from '../../redux/reducer/sidebarSlice';
import { Divider } from 'react-native-elements';

export default function MemberMenu() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const menuData = data.member;
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
            <Icon name={menu.icon} size={25} color='#000' />
            <Text style={styles.menuText}>{menu.name}</Text>
            <Divider width={1} color='#000' />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    padding: 10,
    flexWrap: 'wrap',
    paddingTop: 40,
    backgroundColor: '#eee',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 10,
    marginBottom: 20,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  menuText: {
    color: '#000',
    marginLeft: 20,
  },
});
