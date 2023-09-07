import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native';

export default function MovieTabItem({ tab, activeTab, setActiveTab }) {
  return (
    <TouchableOpacity onPress={()=>setActiveTab(tab.type)}>
      <Text style={[styles.tabItem,{
        opacity: activeTab===tab.type ? 1 : 0.5
      }]}>
        {tab.name}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  tabItem: {
    fontWeight: '500',
    padding: 10,
  },
});
