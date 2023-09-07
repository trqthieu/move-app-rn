import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import React from 'react';
import Header from '../components/home/Header';
import YoutubePlayer from 'react-native-youtube-iframe';
import Icon from 'react-native-vector-icons/Ionicons';
import NewsSlider from '../components/home/NewsSlider';

export default function MovieDetailScreen() {
  return (
    <View style={styles.container}>
      <Header />
      <ScrollView showsVerticalScrollIndicator={false}>
        <YoutubePlayer height={300} play={false} videoId={'sJMN3CtVz-0'} />
        <View style={styles.movieWrap}>
          <Image
            style={styles.movieImage}
            source={require('../assets/images/movie_oppenheimer.jpg')}
          />
          <View>
            <Icon name='calendar' size={25} color='#fff' />
            <Text>25/08/20223</Text>
          </View>
          <View>
            <Icon name='time' size={25} color='#fff' />
            <Text>1giờ 34phút</Text>
          </View>
        </View>
        <Text>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </Text>
        <View style={styles.row}>
          <Text style={styles.colLeft}>Kiểm duyệt</Text>
          <Text style={styles.colRight}>Lorem Ipsum is simply dummy</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.colLeft}>Thể loại</Text>
          <Text style={styles.colRight}>Lorem Ipsum is simply dummy</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.colLeft}>Đạo diễn</Text>
          <Text style={styles.colRight}>Lorem Ipsum is simply dummy</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.colLeft}>Diễn viên</Text>
          <Text style={styles.colRight}>Lorem Ipsum is simply dummy</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.colLeft}>Ngôn ngữ</Text>
          <Text style={styles.colRight}>Lorem Ipsum is simply dummy</Text>
        </View>
        {/* <NewsSlider /> */}
      </ScrollView>
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
    justifyContent: 'space-between',
  },
  movieImage: {
    width: 120,
    height: 200,
    resizeMode: 'contain',
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
});
