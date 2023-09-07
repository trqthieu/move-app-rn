import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

import Header from '../components/home/Header';
import Slider from '../components/home/Slider';
import MovieSlider from '../components/home/MovieSlider';
import ServiceSlider from '../components/home/ServiceSlider';
import Search from '../components/home/Search';
import { ScrollView } from 'react-native';
import data from '../data';
import NewsSlider from '../components/home/NewsSlider';
import Sidebar from '../components/sidebar/Sidebar';
import { useSelector } from 'react-redux';

export default function HomeScreen({ navigator }) {
  const sidebar = useSelector(state => state.sidebar);
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
        {/* <Text>Ưu đãi từ đối tác</Text> */}
      </ScrollView>
      {sidebar.open && <Sidebar />}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
  },
});
