import React, { useState } from 'react';
import { View } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import data from '../../data';
import NewsSliderItem, { ITEM_WIDTH, SLIDER_WIDTH } from './NewsSliderItem';
import NewsSliderTab from './NewsSliderTab';

const NewsSlider = () => {
  const dataMovies = data.slider;
  const carouselRef = React.useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <View
      style={{
        backgroundColor: '#fff',
      }}
    >
      <NewsSliderTab />
      <Carousel
        layout='default'
        ref={carouselRef}
        data={dataMovies}
        renderItem={NewsSliderItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        useScrollView
        onSnapToItem={slideIndex => {
          setCurrentIndex(slideIndex);
        }}
        autoplay={true}
        autoplayInterval={3000}
        loop={true}
      />
    </View>
  );
};

export default NewsSlider;
