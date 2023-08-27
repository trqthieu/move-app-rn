import React from 'react';
import { View } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import MovieSliderItem, { SLIDER_WIDTH, ITEM_WIDTH } from './MovieSliderItem';
import MovieTab from './MovieTab'
import MovieInfo from './MovieInfo'
const data = [
  {
    title: 'Aenean leo',
    imgUrl: require('../assets/images/movie_oppenheimer.jpg'),
  },
  {
    title: 'In turpis',
    imgUrl: require('../assets/images/movie_oppenheimer.jpg'),
  },
  {
    title: 'Lorem Ipsum',
    imgUrl: require('../assets/images/movie_oppenheimer.jpg'),
  },
];

const MovieSlider = () => {
  const carouselRef = React.useRef(null);

  return (
    <View>
      <MovieTab/>
      <Carousel
        layout='default'
        ref={carouselRef}
        data={data}
        renderItem={MovieSliderItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        useScrollView
      />
      <MovieInfo/>
    </View>
  );
};

export default MovieSlider;
