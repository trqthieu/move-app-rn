import { resizeMode } from 'deprecated-react-native-prop-types/DeprecatedImagePropType';
import React from 'react';
import { Text } from 'react-native';
import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

export const SLIDER_WIDTH = Dimensions.get('window').width;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH);

const NewsSliderItem = ({ item, index, navigation }) => {
  const handlePressNews = newsId => {
    navigation.navigate('NewsDetailScreen', { newsId });
  };
  return (
    <View style={styles.container} key={index}>
      {item.map((newsItem, index) => {
        return (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            onPress={() => handlePressNews(newsItem.id)}
          >
            <Image source={{ uri: newsItem.image }} style={styles.image} />
            <Text style={styles.text} numberOfLines={2}>
              {newsItem.title}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    shadowColor: '#000',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingVertical: 10,
  },

  image: {
    width: ITEM_WIDTH,
    height: 100,
    width: SLIDER_WIDTH * 0.44,
    borderRadius: 4,
  },
  text: {
    textTransform: 'uppercase',
    textAlign: 'center',
    padding: 10,
    fontWeight: '600',
    maxWidth: SLIDER_WIDTH * 0.44,
  },
});

export default NewsSliderItem;
