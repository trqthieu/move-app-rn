import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native';

export default function MovieInfo() {
  return (
    <View style={styles.container}>
      <View style={styles.movieInfo}>
        <View style={styles.head}>
          <Text style={styles.name}>Oppenheimer</Text>
          <View style={styles.age}>
            <Text style={styles.ageText}>T16</Text>
          </View>
        </View>
        <View style={styles.body}>
          <Text style={styles.time}>2 giờ 9 phút</Text>
          <Text style={styles.premiere}>01/09/2023</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.btnBooking} activeOpacity={0.6}>
        <Text style={styles.btnBookingText}>Đặt vé</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  movieInfo: {
    padding: 10,
    justifyContent: 'space-between',
  },
  head: {
    flexDirection: 'row',
  },
  name: {
    textTransform: 'uppercase',
    fontWeight: '800',
    fontSize: 16,
  },
  age: {
    borderRadius: 8,
    padding: 5,
    paddingVertical: 0,
    marginLeft: 10,
    borderColor: '#000',
    borderWidth: 1,
  },
  ageText: {
    // color: '#fff',
  },
  body: {
    flexDirection: 'row',
  },
  time: {},
  premiere: {
    marginLeft: 10,
  },
  btnBooking: {
    backgroundColor: '#000',
    borderRadius: 20,
    padding: 5,
    paddingHorizontal: 15,
    backgroundColor: '#c22b21',
  },
  btnBookingText: {
    color: '#fff',
    textTransform: 'uppercase',
    fontSize: 12,
    fontWeight: '500',
  },
});
