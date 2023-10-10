import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import data from '../../data';
import NewsSliderItem, { ITEM_WIDTH, SLIDER_WIDTH } from './NewsSliderItem';
import NewsSliderTab from './NewsSliderTab';
import request from '../../api/request';

const NewsSlider = ({ navigation, type }) => {
  const dataMovies = data.slider;
  const carouselRef = React.useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [newsData, setNewsData] = useState([]);

  const getNewsData = async () => {
    const responseNewsData = await request.getNews(type);
    setNewsData(responseNewsData.data);
  };

  const groupNews = news => {
    const result = [];
    const dimension = Math.floor((news.length - 1) / 2);
    for (let i = 0; i <= dimension; i++) {
      result[i] = [news[2 * i]];
      if (news[2 * i + 1]) {
        result[i].push(news[2 * i + 1]);
      }
    }
    return result;
  };

  useEffect(() => {
    getNewsData();
  }, []);

  return (
    <View
      style={{
        backgroundColor: '#fff',
      }}
    >
      <NewsSliderTab type={type} />
      <Carousel
        layout='default'
        ref={carouselRef}
        data={groupNews(newsData)}
        renderItem={(item, index) => {
          return (
            <NewsSliderItem
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
        autoplay={true}
        autoplayInterval={3000}
        loop={true}
      />
    </View>
  );
};

export default NewsSlider;
