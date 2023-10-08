import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { Divider } from 'react-native-elements';
import { formatNumber } from '../../utils';

export default function FoodBookingItem({
  data,
  selectingFoods,
  setSelectingFoods,
}) {
  const { id, name, price, image, description } = data;
  const foundFood = selectingFoods.find(food => food.id === id);

  const handleFood = type => {
    switch (type) {
      case 'plus':
        if (foundFood) {
          const otherFood = selectingFoods.filter(food => food.id !== id);
          setSelectingFoods([
            ...otherFood,
            {
              id: id,
              quantity: foundFood.quantity + 1,
              price: price,
            },
          ]);
        } else {
          setSelectingFoods([
            ...selectingFoods,
            {
              id: id,
              quantity: 1,
              price: price,
            },
          ]);
        }
        break;
      case 'minus':
        if (foundFood) {
          const otherFood = selectingFoods.filter(food => food.id !== id);
          if (foundFood.quantity > 1) {
            setSelectingFoods([
              ...otherFood,
              {
                id: id,
                quantity: foundFood.quantity - 1,
                price: price,
              },
            ]);
          } else {
            setSelectingFoods([...otherFood]);
          }
        }
        break;
      default:
        break;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.foodWrap}>
        <Image source={{ uri: image }} style={styles.image} />
        <View style={styles.foodInfo}>
          <View>
            <Text style={styles.foodName}>
              {name} - {formatNumber(price)} đ
            </Text>
            <Text style={styles.foodDesc}>{description}</Text>
          </View>
          <View style={styles.foodActionWrap}>
            <Text style={styles.quantity}>{foundFood?.quantity || 0}</Text>
            <View style={styles.foodAction}>
              <TouchableOpacity
                style={styles.foodActionItem}
                onPress={() => handleFood('minus')}
              >
                <Text
                  style={[
                    styles.foodActionItemText,
                    styles.foodActionItemTextMinus,
                  ]}
                >
                  -
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.foodActionItem}
                onPress={() => handleFood('plus')}
              >
                <Text
                  style={[
                    styles.foodActionItemText,
                    styles.foodActionItemTextPlus,
                  ]}
                  Text
                >
                  +
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      <Divider color='#ccc' width={1} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  image: {
    width: 80,
    height: 120,
    resizeMode: 'contain',
  },
  foodWrap: {
    padding: 10,
    flexDirection: 'row',
  },
  foodInfo: {
    marginLeft: 20,
    justifyContent: 'space-between',
  },
  foodName: {
    fontWeight: 'bold',
    // textTransform: 'uppercase',
  },
  foodActionWrap: {
    flexDirection: 'row',
  },
  foodAction: {
    flexDirection: 'row',
  },
  quantity: {
    width: 30,
    height: 30,
    textAlign: 'center',
    lineHeight: 30,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    marginRight: 20,
    fontWeight: 'bold',
  },
  foodActionItem: {},
  foodActionItemText: {
    width: 30,
    height: 30,
    textAlign: 'center',
    lineHeight: 30,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 8,
    fontWeight: 'bold',
    fontSize: 18,
  },
  foodActionItemTextMinus: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderRightWidth: 0,
  },
  foodActionItemTextPlus: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
});
