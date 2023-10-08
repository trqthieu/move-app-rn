import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import Header from '../components/home/Header';
import YoutubePlayer from 'react-native-youtube-iframe';
import Icon from 'react-native-vector-icons/Ionicons';
import NewsSlider from '../components/home/NewsSlider';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import Sidebar from '../components/sidebar/Sidebar';
import request from '../api/request';
import { formatDate, toHoursAndMinutes } from '../utils';

export default function MovieDetailScreen({ navigation, route }) {
  const [movieData, setMovieData] = useState();
  const [category, setCategory] = useState('');
  const sidebar = useSelector(state => state.sidebar);
  const movieId = route.params.movieId;
  const getMovieDetail = async movieId => {
    const responseMovie = await request.getMovieById(movieId);
    const responseCategory = await request.getCategoriesByMovieId(movieId);
    setMovieData(responseMovie.data);
    setCategory(responseCategory.data);
  };
  useEffect(() => {
    getMovieDetail(movieId);
  }, []);
  const handleBooking = () => {
    navigation.navigate('BookingCinemaScreen', {
      movieId: route.params.movieId,
    });
  };
  return (
    <View style={styles.container}>
      <Header />
      <ScrollView showsVerticalScrollIndicator={false}>
        <YoutubePlayer
          height={220}
          play={true}
          videoId={movieData?.[0]?.primaryThumbnail}
        />
        <Text style={styles.movieName}>{movieData?.[0]?.name}</Text>
        <View style={styles.movieWrap}>
          <Image
            style={styles.movieImage}
            source={{ uri: movieData?.[0]?.image }}
          />
          <View style={styles.movieWrapRight}>
            <View style={styles.movieWrapRightItem}>
              <Icon
                name='calendar'
                size={25}
                color='#990000'
                style={styles.movieWrapRightIcon}
              />
              <Text>{formatDate(movieData?.[0]?.timeRelease)}</Text>
            </View>
            <View style={styles.movieWrapRightItem}>
              <Icon
                name='time'
                size={25}
                color='#990000'
                style={styles.movieWrapRightIcon}
              />
              <Text>{toHoursAndMinutes(movieData?.[0]?.time)}</Text>
            </View>
            <View style={styles.movieWrapRightItem}>
              <Icon
                name='eye'
                size={25}
                color='#990000'
                style={styles.movieWrapRightIcon}
              />
              <Text>{movieData?.[0]?.view || 0}</Text>
            </View>
            <View style={styles.movieWrapRightItem}>
              <Icon
                name='share-social'
                size={25}
                color='#990000'
                style={styles.movieWrapRightIcon}
              />
              <Text>{movieData?.[0]?.view || 0}</Text>
            </View>
          </View>
        </View>

        <Text style={styles.movieDesc}>{movieData?.[0]?.description}</Text>
        <View style={styles.row}>
          <Text style={styles.colLeft}>Quốc gia</Text>
          <Text style={styles.colRight}>{movieData?.[0]?.country}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.colLeft}>Thể loại</Text>
          <Text style={styles.colRight}>{category?.[0]?.name}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.colLeft}>Đạo diễn</Text>
          <Text style={styles.colRight}>{movieData?.[0]?.director}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.colLeft}>Quốc gia</Text>
          <Text style={styles.colRight}>{movieData?.[0]?.country}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.colLeft}>Ngôn ngữ</Text>
          <Text style={styles.colRight}>{movieData?.[0]?.language}</Text>
        </View>
        {/* <NewsSlider /> */}
      </ScrollView>
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.btnBooking}
        onPress={handleBooking}
      >
        <Text style={styles.textBooking}>Đặt vé</Text>
      </TouchableOpacity>
      {/* {sidebar.open && <Sidebar />} */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
  },
  movieWrap: {
    flexDirection: 'row',
    padding: 10,
  },
  movieWrapRight: {
    padding: 20,
  },
  movieWrapRightItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  movieWrapRightIcon: {
    marginRight: 10,
  },
  movieImage: {
    borderRadius: 5,
    width: 150,
    height: 240,
    resizeMode: 'contain',
  },
  movieName: {
    padding: 10,
    textTransform: 'uppercase',
    fontWeight: '700',
  },
  movieDesc: {
    paddingHorizontal: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    paddingVertical: 5,
  },
  colLeft: {
    width: '30%',
    fontWeight: '800',
  },
  colRight: {
    flex: 1,
    flexWrap: 'wrap',
  },
  btnBooking: {
    backgroundColor: '#990000',
    padding: 10,
  },
  textBooking: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textTransform: 'uppercase',
    textAlign: 'center',
  },
});
