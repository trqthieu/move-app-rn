import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Header from '../components/home/Header';
import Sidebar from '../components/sidebar/Sidebar';
import FoodBookingItem from '../components/bookingCinema/FoodBookingItem';
import data from '../data';
import request from '../api/request';
import { formatNumber } from '../utils';

export default function BookingFoodScreen({ navigation, route }) {
  const foodData = data.foods;
  const [products, setProducts] = useState([]);
  const { movie, scheduleId, selectingChair, totalMoney } = route.params;
  const sidebar = useSelector(state => state.sidebar);
  const [totalMoneyFood, setTotalMoneyFood] = useState(0);
  const [selectingFoods, setSelectingFoods] = useState([]);
  const handleCheckout = () => {
    navigation.navigate('InvoiceScreen', {
      movie,
      scheduleId,
      selectingChair,
      totalMoney,
      selectingFoods,
    });
  };

  useEffect(() => {
    const money = selectingFoods.reduce((a, b) => a + b.price * b.quantity, 0);
    setTotalMoneyFood(money);
  }, [selectingFoods]);

  const getProducts = async () => {
    const response = await request.getProducts();
    setProducts(response.data);
  };
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <View style={styles.container}>
      {/* <Header /> */}
      {/* {sidebar.open && <Sidebar />} */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {products.map((foodItem, index) => (
          <FoodBookingItem
            data={foodItem}
            key={index}
            selectingFoods={selectingFoods}
            setSelectingFoods={setSelectingFoods}
          />
        ))}
      </ScrollView>
      <View style={styles.chairInfoWrap}>
        <View style={styles.movieWrap}>
          <Text style={styles.movieName}>{movie?.[0]?.name}</Text>
          <Text style={styles.movieLimitAge}>T{movie?.[0]?.ageLimit}</Text>
        </View>
        <View style={styles.movieSubtitleWrap}>
          <Text style={styles.movieSubtitle}>
            {movie?.[0]?.format} {movie?.[0]?.language}
          </Text>
          <TouchableOpacity
            style={styles.btnBooking}
            activeOpacity={0.6}
            onPress={handleCheckout}
          >
            <Text style={styles.btnBookingText}>Thanh toán</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.chairInfo}>
          <Text style={styles.chairPrice}>
            {formatNumber(totalMoney + totalMoneyFood)} đ
          </Text>
          <Text style={styles.chairCount}>{selectingChair.length} ghế</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    // backgroundColor: '#424242',
  },
  screen: {
    textAlign: 'center',
    padding: 20,
    marginBottom: 50,
    // marginTop: 50,
    borderWidth: 1,
  },
  chairRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  chairColumn: {},
  chairItem: {
    padding: 5,
    borderWidth: 1,
    margin: 1,
    borderRadius: 5,
  },
  chairInfoWrap: {
    padding: 10,
    backgroundColor: '#424242',
  },
  movieWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  movieName: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: 'white',
  },
  movieLimitAge: {
    marginLeft: 10,
    borderRadius: 10,
    padding: 5,
    paddingVertical: 2,
    borderWidth: 1,
    borderColor: '#c29f13',
    color: '#c29f13',
  },
  movieSubtitleWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  movieSubtitle: {
    color: 'white',
  },
  btnBooking: {
    backgroundColor: '#000',
    borderRadius: 20,
    padding: 5,
    paddingHorizontal: 15,
    backgroundColor: '#c22b21',
  },
  btnBookingText: {
    color: '#fff',
    textTransform: 'uppercase',
    fontSize: 14,
    fontWeight: '500',
  },
  chairInfo: {
    flexDirection: 'row',
  },
  chairPrice: {
    fontWeight: 'bold',
    color: 'white',
  },
  chairCount: {
    marginLeft: 20,
    color: 'white',
  },
  chairOption: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-evenly',
  },
  chairOptionItem: {
    flexDirection: 'row',
    marginLeft: 20,
    marginBottom: 10,
  },
  chairOptionBlock: {
    width: 25,
    height: 25,
    borderRadius: 10,
    marginRight: 5,
    borderColor: 'black',
    borderWidth: 1,
  },
  chairOptionText: {},
  normalChair: {
    backgroundColor: '#ccc',
  },
  vipChair: {
    backgroundColor: '#5cb85c',
  },
  selectingChair: {
    backgroundColor: '#d9534f',
  },
  selectedChair: {
    backgroundColor: '#f0ad4e',
  },
});
