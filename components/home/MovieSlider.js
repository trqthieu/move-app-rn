import React, { useState } from 'react';
import { View } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import MovieSliderItem, { SLIDER_WIDTH, ITEM_WIDTH } from './MovieSliderItem';
import MovieTab from './MovieTab';
import MovieInfo from './MovieInfo';
import data from '../../data';

const MovieSlider = ({ navigation, moviesData }) => {
  const dataMovies = moviesData;
  const carouselRef = React.useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  return (
    <View>
      <MovieTab />
      <Carousel
        loop
        layout='default'
        ref={carouselRef}
        data={dataMovies}
        renderItem={(item, index) => {
          return (
            <MovieSliderItem
              item={item.item}
              index={item.index}
              navigation={navigation} // Pass navigator as a prop to MovieSliderItem
            />
          );
        }}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        useScrollView
        onSnapToItem={slideIndex => {
          setCurrentIndex(slideIndex);
        }}
      />
      <MovieInfo data={dataMovies[currentIndex]} />
    </View>
  );
};

export default MovieSlider;
