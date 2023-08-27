import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

import Header from '../components/Header';
import Slider from '../components/Slider';
import MovieSlider from '../components/MovieSlider';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Header />
      <Slider />
      <MovieSlider />
      <Text>Content</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#eee',
  },
});
