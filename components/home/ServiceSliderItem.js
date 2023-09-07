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

const ServiceSliderItem = ({ item, index }) => {
  return (
    <View style={styles.container} key={index}>
      <TouchableOpacity activeOpacity={0.8}>
        <Image source={item.imgUrl} style={styles.image} />
        <Text style={styles.text}>Cgv store</Text>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.8}>
        <Image source={item.imgUrl} style={styles.image} />
        <Text style={styles.text}>Cgv store</Text>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.8}>
        <Image source={item.imgUrl} style={styles.image} />
        <Text style={styles.text}>Cgv store</Text>
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
    paddingVertical: 20,
  },

  image: {
    width: ITEM_WIDTH,
    height: SLIDER_WIDTH / 4,
    width: SLIDER_WIDTH / 4,
    borderRadius: SLIDER_WIDTH / 8,
  },
  text: {
    textTransform: 'uppercase',
    textAlign: 'center',
    padding: 10,
    fontWeight: '600',
  },
});

export default ServiceSliderItem;
