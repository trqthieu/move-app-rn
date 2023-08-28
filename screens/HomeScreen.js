import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

import Header from '../components/Header';
import Slider from '../components/Slider';
import MovieSlider from '../components/MovieSlider';
import ServiceSlider from '../components/ServiceSlider';
import Search from '../components/Search';
import { ScrollView } from 'react-native';
import data from '../data';
import NewsSlider from '../components/NewsSlider';

export default function HomeScreen() {
  const dataSlider = data.slider;
  const dataDiscount = data.discount;
  return (
    <View style={styles.container}>
      <Header />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Slider data={dataSlider} />
        <MovieSlider />
        <Search />
        <Slider data={dataDiscount} />
        <ServiceSlider />
        <NewsSlider />
        <NewsSlider />
        <Text>Ưu đãi từ đối tác</Text>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
  },
});
