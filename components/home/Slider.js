import React from 'react';
import { View } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import CarouselCardItem, { SLIDER_WIDTH, ITEM_WIDTH } from './CarouselCardItem';

const Slider = ({ data }) => {
  const carouselRef = React.useRef(null);
  return (
    <View>
      <Carousel
        layout='default'
        ref={carouselRef}
        data={data}
        renderItem={CarouselCardItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        useScrollView
        autoplay={true}
        autoplayInterval={3000}
        loop={true}
      />
    </View>
  );
};

export default Slider;
