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

export default function MovieListScreen({ navigation }) {
  const [moviesData, setMoviesData] = useState([]);
  console.log('moviesData', moviesData);
  const getMoviesData = async () => {
    const resultMovies = await request.getMovies();
    setMoviesData(resultMovies.data);
  };
  useEffect(() => {
    getMoviesData();
  }, []);
  return (
    <View style={styles.containerWrap}>
      <Header />
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {moviesData.map(movieItem => {
            return (
              <TouchableOpacity
                key={movieItem.id}
                onPress={() =>
                  navigation.navigate('MovieDetailScreen', {
                    movieId: movieItem.id,
                  })
                }
              >
                <View style={styles.movieItem}>
                  <Image
                    source={{ uri: movieItem.image }}
                    style={styles.movieImage}
                  />
                  <View style={styles.movieInfo}>
                    <Text style={styles.movieName}>{movieItem.name}</Text>
                    <Text>{movieItem.language}</Text>
                    <Text numberOfLines={2} style={styles.movieDescription}>
                      {movieItem.description}
                    </Text>
                    {/* <Text>{movieItem.ageLimit}</Text> */}
                    <Text>{formatDate(movieItem.timeRelease)}</Text>
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
    alignItems: 'flex-start',
  },
  movieImage: {
    width: 100,
    height: 140,
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
