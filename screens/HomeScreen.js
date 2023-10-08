import {
  View,
  Text,
  StyleSheet,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';

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
import request from '../api/request';
import axios from 'axios';
import axiosClient from '../api';

export default function HomeScreen({ navigation }) {
  const sidebar = useSelector(state => state.sidebar);
  const dataSlider = data.slider;
  const dataDiscount = data.discount;
  const [moviesData, setMoviesData] = useState([]);

  const getMovies = async () => {
    const response = await request.getMovies();
    setMoviesData(response.data);
  };

  useEffect(() => {
    getMovies();
  }, []);

  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getMovies().then(() => {
      setRefreshing(false);
    });
  }, []);
  return (
    <View style={styles.container}>
      <Header />
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Slider data={dataSlider} />
        <MovieSlider navigation={navigation} moviesData={moviesData} />
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
