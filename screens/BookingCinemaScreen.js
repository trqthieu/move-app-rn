import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import React from 'react';
import Header from '../components/home/Header';
import YoutubePlayer from 'react-native-youtube-iframe';
import Icon from 'react-native-vector-icons/Ionicons';
import NewsSlider from '../components/home/NewsSlider';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import Sidebar from '../components/sidebar/Sidebar';
import TimePicker from '../components/bookingCinema/TimePicker';
import CinemaBookingList from '../components/bookingCinema/CinemaBookingList';

export default function BookingCinemaScreen({ navigation, route }) {
  const sidebar = useSelector(state => state.sidebar);
  const movieId = route.params.movieId;
  return (
    <View style={styles.container}>
      <Header />
      <TimePicker navigation={navigation} movieId={movieId} />
      {/* <ScrollView>
        <CinemaBookingList />
      </ScrollView> */}

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
    width: 150,
    height: 200,
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
