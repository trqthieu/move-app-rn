import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import MovieTabItem from './MovieTabItem';
import { useNavigation } from '@react-navigation/native';

export default function MovieTab() {
  const [activeTab, setActiveTab] = useState('showing');
  const navigation = useNavigation();
  const tabList = [
    {
      type: 'showing',
      name: 'Đang chiếu',
    },
    {
      type: 'special',
      name: 'Đặc biệt',
    },
    {
      type: 'coming',
      name: 'Sắp chiếu',
    },
  ];
  return (
    <View style={styles.container}>
      <View style={styles.tabList}>
        {tabList.map((tab, index) => (
          <MovieTabItem
            key={index}
            tab={tab}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        ))}
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('MovieListScreen')}>
        <Text style={styles.tabItem}>Xem tất cả</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    paddingVertical: 10,
  },
  tabList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tabItem: {
    fontWeight: '500',
    padding: 10,
  },
});
