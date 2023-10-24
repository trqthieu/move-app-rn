import { View, Text, Image } from 'react-native';
import React from 'react';
import Header from '../components/home/Header';
import { useState } from 'react';
import request from '../api/request';
import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { formatDate } from '../utils';
import { ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native';

export default function NewsListScreen({ navigation, route }) {
  const { type } = route.params;
  const [newsData, setNewsData] = useState([]);
  console.log('newsData', newsData);
  const getNewsData = async () => {
    const resultMovies = await request.getNews(type);
    setNewsData(resultMovies.data);
  };
  useEffect(() => {
    getNewsData();
  }, []);
  return (
    <View style={styles.containerWrap}>
      <Header />
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {newsData.map(newsItem => {
            return (
              <TouchableOpacity
                key={newsItem.id}
                onPress={() =>
                  navigation.navigate('NewsDetailScreen', {
                    newsId: newsItem.id,
                  })
                }
              >
                <View style={styles.movieItem}>
                  <Image
                    source={{ uri: newsItem.image }}
                    style={styles.movieImage}
                  />
                  <View style={styles.movieInfo}>
                    <Text style={styles.movieName}>{newsItem.title}</Text>
                    <Text numberOfLines={2} style={styles.movieDescription}>
                      {newsItem.content}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  containerWrap: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  movieItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    alignItems: 'center',
  },
  movieImage: {
    width: 120,
    height: 60,
    resizeMode: 'contain',
    borderRadius: 5,
    marginRight: 10,
  },
  movieName: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  movieInfo: {
    flex: 1,
  },
  movieDescription: {
    marginVertical: 10,
  },
});
