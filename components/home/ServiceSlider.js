import React, { useState } from 'react';
import { View } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import ServiceSliderItem, {
  SLIDER_WIDTH,
  ITEM_WIDTH,
} from './ServiceSliderItem';
import data from '../../data';

const ServiceSlider = () => {
  const dataMovies = data.slider;
  const carouselRef = React.useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <View
      style={{
        backgroundColor: '#ccc',
        paddingBottom: 20,
      }}
    >
      <Carousel
        layout='default'
        ref={carouselRef}
        data={dataMovies}
        renderItem={ServiceSliderItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        useScrollView
        onSnapToItem={slideIndex => {
          setCurrentIndex(slideIndex);
        }}
      />
      <Pagination
        dotsLength={dataMovies.length}
        activeDotIndex={currentIndex}
        containerStyle={{
          paddingVertical: 0,
        }}
        dotStyle={{
          width: 8,
          height: 8,
          borderRadius: 4,
          backgroundColor: 'rgba(255, 100, 100, 0.92)',
        }}
        inactiveDotOpacity={0.6}
        inactiveDotScale={0.6}
      />
    </View>
  );
};

export default ServiceSlider;
