import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Header() {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/user.png')}
        style={styles.user}
      />

      <Image
        source={require('../assets/images/logo.png')}
        style={styles.logo}
      />
      <TouchableOpacity activeOpacity={0.6}>
        <Icon name='menu' color='#000' size={30} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  user: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
  },
  logo: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
});
