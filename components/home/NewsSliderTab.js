import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native';

export default function NewsSliderTab({ type }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {type === 'NEWS'
          ? 'Tin nóng'
          : type === 'DISCOUNT'
          ? 'Khuyến mãi'
          : 'Trailer'}
      </Text>
      <TouchableOpacity activeOpacity={0.6} style={styles.button}>
        <Text>Xem tất cả</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    paddingBottom: 0,
  },
  button: {
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 20,
    padding: 8,
    paddingVertical: 4,
  },
  text: {
    fontWeight: '600',
    fontSize: 16,
  },
});
