import React from 'react';
import { View } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import CarouselCardItem, { SLIDER_WIDTH, ITEM_WIDTH } from './CarouselCardItem';
const data = [
  {
    title: 'Aenean leo',
    imgUrl: require('../assets/images/oppenheimer.jpg'),
  },
  {
    title: 'In turpis',
    imgUrl: require('../assets/images/oppenheimer.jpg'),
  },
  {
    title: 'Lorem Ipsum',
    imgUrl: require('../assets/images/oppenheimer.jpg'),
  },
];

const Slider = () => {
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
      />
    </View>
  );
};

export default Slider;
