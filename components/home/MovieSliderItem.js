import { resizeMode } from 'deprecated-react-native-prop-types/DeprecatedImagePropType';
import React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

export const SLIDER_WIDTH = Dimensions.get('window').width;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);

const MovieSliderItem = ({ item, index, navigation }) => {
  const handlePressMovie = () => {
    navigation.navigate('MovieDetailScreen', { movieId: item.id });
  };
  return (
    <View style={styles.container} key={index}>
      <TouchableOpacity activeOpacity={0.8} onPress={handlePressMovie}>
        <Image source={{ uri: item.image }} style={styles.image} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
  },
  image: {
    width: ITEM_WIDTH,
    height: 380,
    borderRadius: 8,
  },
});

export default MovieSliderItem;
