import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native';

export default function Search() {
  return (
    <View style={styles.container}>
      <TextInput placeholder='Tìm kiếm phim' style={styles.search} />
      <TouchableOpacity activeOpacity={0.8} style={styles.icon}>
        <Icon name='search' size={20} color='#000' />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 20,
    backgroundColor: '#fff',
  },
  search: {
    flex: 1,
  },
  icon: {
    padding: 15,
  },
});
