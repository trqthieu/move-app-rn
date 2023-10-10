import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { formatNumber } from '../utils';
import request from '../api/request';

export default function BankScreen({ navigation, route }) {
  const { movie, scheduleId, selectingChair, totalMoney, selectingFoods } =
    route.params;
  const [minutes, setMinutes] = useState(10);
  const [seconds, setSeconds] = useState(0);

  const [data, setData] = useState({
    cardNumber: '',
    cardExpire: '',
    cvc: '',
  });
  const totalMoneyFood = selectingFoods.reduce(
    (a, b) => a + b.price * b.quantity,
    0
  );
  const handleCheckout = async () => {
    const { cardNumber, cardExpire, cvc } = data;
    if (
      !cardNumber.trim().length ||
      !cardExpire.trim().length ||
      !cvc.trim().length
    ) {
      ToastAndroid.show('Vui lòng điền đầy đủ thông tin', ToastAndroid.SHORT);
      return;
    }
    const response = await request.bookingChairs({
      scheduleId,
      selectedChairs: selectingChair.map(chair => chair.id),
      totalMoney: totalMoney + totalMoneyFood,
      products: selectingFoods,
    });
    if (response.data.success) {
      ToastAndroid.show('Đặt vé thành công!', ToastAndroid.SHORT);
      setTimeout(() => {
        navigation.navigate('HomeScreen');
      }, 1500);
    }
  };

  useEffect(() => {
    let interval;
    const updateCountdown = () => {
      if (minutes === 0 && seconds === 0) {
        clearInterval(interval);
      } else if (seconds === 0) {
        setMinutes(minutes - 1);
        setSeconds(59);
      } else {
        setSeconds(seconds - 1);
      }
    };

    interval = setInterval(updateCountdown, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [minutes, seconds]);

  return (
    <View style={styles.container}>
      <View style={styles.sumMoneyWrap}>
        <Image
          source={require('../assets/images/logo.png')}
          style={styles.logo}
        />
        <View style={styles.sumMoney}>
          <Text style={styles.sumMoneyText}>Số tiền thanh toán</Text>
          <Text style={styles.sumMoneyValue}>
            {formatNumber(totalMoney + totalMoneyFood)} đ
          </Text>
        </View>
      </View>
      <View style={styles.timeWrap}>
        <Image
          source={require('../assets/images/vietnamflag.png')}
          style={styles.flag}
        />
        <View style={styles.time}>
          <Icon name='time' color='#000' size={20} />
          <Text style={styles.timeValue}>{`${minutes}:${
            seconds < 10 ? '0' : ''
          }${seconds}`}</Text>
        </View>
      </View>
      <View style={styles.formCard}>
        <View style={styles.formCardRow}>
          <View style={styles.formCardItemFull}>
            <Text style={styles.formCardItemText}>Số thẻ</Text>
            <TextInput
              placeholder='1234 5678 9101 1234'
              style={styles.formCardItemInput}
              onChangeText={text =>
                setData({
                  ...data,
                  cardNumber: text.trim(),
                })
              }
            />
          </View>
        </View>
        <View style={styles.formCardRow}>
          <View style={styles.formCardItem}>
            <Text style={styles.formCardItemText}>Tháng, năm hết hạn</Text>
            <TextInput
              placeholder='12/25'
              style={styles.formCardItemInput}
              onChangeText={text =>
                setData({
                  ...data,
                  cardExpire: text.trim(),
                })
              }
            />
          </View>
          <View style={styles.formCardItem}>
            <Text style={styles.formCardItemText}>CVC</Text>
            <TextInput
              placeholder='123'
              style={styles.formCardItemInput}
              onChangeText={text =>
                setData({
                  ...data,
                  cvc: text.trim(),
                })
              }
            />
          </View>
        </View>
        <View style={styles.commit}>
          <Icon
            name='shield-checkmark'
            color='#784c4c'
            size={20}
            style={styles.commitIcon}
          />
          <Text style={styles.commitText}>
            OnePay đảm bảo mọi thông tin thanh toán được bảo mật và mã hóa theo
            tiêu chuẩn quốc tế
          </Text>
        </View>
        <View style={styles.checkoutWrap}>
          <Text style={styles.instructionText}>Hướng dẫn</Text>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.btnCheckout}
            onPress={handleCheckout}
          >
            <Text style={styles.btnCheckoutText}>Thanh toán</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.textCenter}>1900 633 927 (8h30 - 22h)</Text>
      <Text style={styles.textCenter}>support@onepay.vn</Text>
      <View style={styles.onepayWrap}>
        <Text>Giải pháp thanh toán được cung cấp bởi</Text>
        <Image
          source={require('../assets/images/onepay.png')}
          style={styles.onepayIcon}
        />
      </View>
      <View style={styles.supportWrap}></View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {},
  sumMoneyWrap: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    width: 120,
    height: 80,
    resizeMode: 'contain',
  },
  sumMoney: {},
  sumMoneyText: {},
  sumMoneyValue: {
    color: '#3d09b5',
    fontWeight: 'bold',
  },
  timeWrap: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#ccc',
  },
  flag: {
    width: 30,
    height: 20,
    borderRadius: 5,
  },
  time: {
    flexDirection: 'row',
  },
  formCard: {
    padding: 20,
  },
  formCardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  formCardItem: {
    width: '50%',
  },
  formCardItemFull: {
    width: '100%',
  },
  formCardItemText: {
    marginBottom: 5,
  },
  formCardItemInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 5,
    borderRadius: 5,
  },
  commit: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingRight: 20,
  },
  commitText: {
    color: '#784c4c',
  },
  checkoutWrap: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 20,
  },
  instructionText: {
    color: '#3d09b5',
    textDecorationLine: 'underline',
    marginRight: 10,
  },
  btnCheckout: {
    backgroundColor: '#3d09b5',
    borderRadius: 5,
  },
  btnCheckoutText: {
    padding: 20,
    paddingVertical: 10,
    color: 'white',
  },
  textCenter: {
    textAlign: 'center',
  },
  onepayWrap: {
    alignItems: 'center',
    padding: 10,
  },
  onepayIcon: {
    width: 120,
    height: 80,
    resizeMode: 'contain',
  },
});
