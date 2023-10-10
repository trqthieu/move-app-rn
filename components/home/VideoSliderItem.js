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

const VideoSliderItem = ({ item, index }) => {
  return (
    <View style={styles.container} key={index}>
      <TouchableOpacity activeOpacity={0.8}>
        <Image source={item.imgUrl} style={styles.image} />
        <Text style={styles.text} numberOfLines={2}>
          Mua vé xem phim tại CGV với giá chỉ 1000$
        </Text>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.8}>
        <Image source={item.imgUrl} style={styles.image} />
        <Text style={styles.text} numberOfLines={2}>
          Mua vé xem phim tại CGV với giá chỉ 1000$
        </Text>
      </TouchableOpacity>
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

export default VideoSliderItem;
