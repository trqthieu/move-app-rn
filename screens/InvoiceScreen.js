import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import data from '../data';
import Icon from 'react-native-vector-icons/Ionicons';
import request from '../api/request';
import { formatDateTime, formatNumber } from '../utils';

export default function InvoiceScreen({ navigation, route }) {
  const { movie, scheduleId, selectingChair, totalMoney, selectingFoods } =
    route.params;
  const totalMoneyFood = selectingFoods.reduce(
    (a, b) => a + b.price * b.quantity,
    0
  );
  const [scheduleDetail, setScheduleDetail] = useState();

  const getScheduleDetail = async scheduleId => {
    const responseSchedule = await request.getScheduleById(scheduleId);
    setScheduleDetail(responseSchedule.data);
  };
  useEffect(() => {
    getScheduleDetail(scheduleId);
  }, []);
  const handleBooking = () => {
    navigation.navigate('BankScreen', {
      movie,
      scheduleId,
      selectingChair,
      totalMoney,
      selectingFoods,
    });
  };
  return (
    <View style={styles.container}>
      <View style={styles.ticketSummary}>
        <Image source={{ uri: movie?.[0]?.image }} style={styles.movieImage} />
        <View style={styles.ticketSummaryRight}>
          <View style={styles.movieNameWrap}>
            <Text style={styles.movieName}>{movie?.[0]?.name}</Text>
            <Text style={styles.movieLimitAge}>T{movie?.[0]?.ageLimit}</Text>
          </View>
          <Text style={styles.movieDesc} numberOfLines={2}>
            {movie?.[0]?.description}
          </Text>
          <Text style={styles.fontBold}>
            {formatDateTime(scheduleDetail?.[0]?.premiere)}
          </Text>
          <Text style={styles.fontBold}>{scheduleDetail?.[0]?.cinemaName}</Text>
          <Text style={styles.fontBold}>{scheduleDetail?.[0]?.roomName}</Text>
          <Text style={styles.fontBold}>
            Ghế:{' '}
            {selectingChair
              .map(chair => `${chair.xPosition}${chair.yPosition}`)
              .join(', ')}
          </Text>
        </View>
      </View>
      <ScrollView>
        <View style={styles.ticketInfo}>
          <Text style={styles.ticketInfoHeader}>Thông tin vé</Text>
          <View style={styles.ticketInfoItem}>
            <Text>Số lượng ghế</Text>
            <Text>{selectingChair.length || 0}</Text>
          </View>
          <View style={styles.ticketInfoItem}>
            <Text>Tổng</Text>
            <Text>{formatNumber(totalMoney)} đ</Text>
          </View>
        </View>
        <View style={styles.ticketInfo}>
          <Text style={styles.ticketInfoHeader}>Thông tin đồ uống</Text>
          <View style={styles.ticketInfoItem}>
            <Text>Số lượng</Text>
            <Text>{selectingFoods?.length || 0}</Text>
          </View>
          <View style={styles.ticketInfoItem}>
            <Text>Tổng</Text>
            <Text>{formatNumber(totalMoneyFood)} đ</Text>
          </View>
        </View>
        <View style={styles.ticketInfo}>
          <Text style={styles.ticketInfoHeader}>Tổng kết</Text>
          <View style={styles.ticketInfoItem}>
            <Text>Tổng cộng</Text>
            <Text>{formatNumber(totalMoney + totalMoneyFood)} đ</Text>
          </View>
          <View style={styles.ticketInfoItem}>
            <Text>Giảm giá</Text>
            <Text>0 đ</Text>
          </View>
          <View style={styles.ticketInfoItem}>
            <Text>Còn lại</Text>
            <Text>{formatNumber(totalMoney + totalMoneyFood)} đ</Text>
          </View>
        </View>
        <View style={styles.ticketInfo}>
          <Text style={styles.ticketInfoHeader}>Thanh toán</Text>
          <View style={styles.cardItem}>
            <View style={styles.cardItemLeft}>
              <Image
                source={require('../assets/images/visa.png')}
                style={styles.cardImage}
              />
              <Text>Thẻ quốc tế</Text>
            </View>
            <Icon name='checkmark' color='#a83232' size={24} />
          </View>
          <View style={styles.cardItem}>
            <View style={styles.cardItemLeft}>
              <Image
                source={require('../assets/images/visa.png')}
                style={styles.cardImage}
              />
              <Text>Thẻ quốc tế</Text>
            </View>
            <Icon name='checkmark' color='#a83232' size={24} />
          </View>
          <View style={styles.cardItem}>
            <View style={styles.cardItemLeft}>
              <Image
                source={require('../assets/images/visa.png')}
                style={styles.cardImage}
              />
              <Text>Thẻ quốc tế</Text>
            </View>
            <Icon name='checkmark' color='#a83232' size={24} />
          </View>
          <View style={styles.cardItem}>
            <View style={styles.cardItemLeft}>
              <Image
                source={require('../assets/images/visa.png')}
                style={styles.cardImage}
              />
              <Text>Thẻ quốc tế</Text>
            </View>
            <Icon name='checkmark' color='#a83232' size={24} />
          </View>
          <View style={styles.cardItem}>
            <View style={styles.cardItemLeft}>
              <Image
                source={require('../assets/images/visa.png')}
                style={styles.cardImage}
              />
              <Text>Thẻ quốc tế</Text>
            </View>
            <Icon name='checkmark' color='#a83232' size={24} />
          </View>
        </View>
        <View style={styles.agreement}>
          <Text>
            Tôi đồng ý với điều khoản sử dụng và đang mua vé cho người có độ
            tuổi phù hợp
          </Text>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.btnBooking}
            onPress={handleBooking}
          >
            <Text style={styles.textBooking}>Đặt vé</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  ticketSummary: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  movieImage: {
    width: 80,
    height: 120,
    resizeMode: 'cover',
    marginRight: 20,
  },
  ticketSummaryRight: {
    paddingVertical: 10,
    flex: 1,
  },
  movieNameWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  movieName: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
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
  ticketInfo: {},
  ticketInfoHeader: {
    fontWeight: 'bold',
    paddingHorizontal: 10,
    paddingVertical: 20,
    textTransform: 'uppercase',
    backgroundColor: '#ccc',
  },
  ticketInfoItem: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  cardItem: {
    flexDirection: 'row',
    padding: 20,
    paddingVertical: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  cardItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardImage: {
    height: 40,
    width: 60,
    resizeMode: 'contain',
    marginRight: 20,
  },
  foodInfo: {},
  priceInfo: {},
  cardType: {},
  fontBold: {
    fontWeight: 'bold',
  },
  agreement: {
    padding: 20,
    backgroundColor: '#ccc',
  },
  btnBooking: {
    marginTop: 20,
    backgroundColor: '#990000',
    padding: 10,
    borderRadius: 20,
  },
  textBooking: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textTransform: 'uppercase',
    textAlign: 'center',
  },
});
