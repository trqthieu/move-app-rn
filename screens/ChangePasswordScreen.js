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
import { isValidEmail } from '../utils';
import request from '../api/request';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ChangePasswordScreen({ navigation }) {
  const handleRegister = () => {
    navigation.navigate('RegisterScreen');
  };

  const [data, setData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  const handleChangePassword = async () => {
    if (
      data.oldPassword.length < 6 ||
      data.newPassword.length < 6 ||
      data.confirmNewPassword.length < 6
    ) {
      ToastAndroid.show(
        'Độ dài mật khẩu phải từ 6 ký tự trở lên',
        ToastAndroid.SHORT
      );
      return;
    }
    if (data.newPassword !== data.confirmNewPassword) {
      ToastAndroid.show('Mật khẩu mới không trùng khớp', ToastAndroid.SHORT);
      return;
    }
    const response = await request.changePassword(data);
    if (response?.data?.success === false) {
      ToastAndroid.show(response.data.data.message, ToastAndroid.SHORT);
      return;
    }
    ToastAndroid.show('Đổi mật khẩu thành công', ToastAndroid.SHORT);
    navigation.navigate('HomeScreen');
  };
  return (
    <View style={styles.container}>
      <View style={styles.sumMoneyWrap}>
        <Image
          source={require('../assets/images/logo.png')}
          style={styles.logo}
        />
      </View>
      <View style={styles.timeWrap}>
        <Image
          source={require('../assets/images/vietnamflag.png')}
          style={styles.flag}
        />
      </View>
      <View style={styles.formCard}>
        <View style={styles.formCardRow}>
          <View style={styles.formCardItemFull}>
            <Text style={styles.formCardItemText}>Mật khẩu cũ</Text>
            <TextInput
              secureTextEntry={true}
              style={styles.formCardItemInput}
              onChangeText={text =>
                setData({
                  ...data,
                  oldPassword: text.trim(),
                })
              }
            />
          </View>
        </View>
        <View style={styles.formCardRow}>
          <View style={styles.formCardItemFull}>
            <Text style={styles.formCardItemText}>Mật khẩu mới</Text>
            <TextInput
              secureTextEntry={true}
              style={styles.formCardItemInput}
              onChangeText={text =>
                setData({
                  ...data,
                  newPassword: text.trim(),
                })
              }
            />
          </View>
        </View>
        <View style={styles.formCardRow}>
          <View style={styles.formCardItemFull}>
            <Text style={styles.formCardItemText}>Xác nhận mật khẩu mới</Text>
            <TextInput
              secureTextEntry={true}
              style={styles.formCardItemInput}
              onChangeText={text =>
                setData({
                  ...data,
                  confirmNewPassword: text.trim(),
                })
              }
            />
          </View>
        </View>

        <View style={styles.checkoutWrap}>
          <Text
            style={styles.instructionText}
            onPress={() => navigation.navigate('HomeScreen')}
          >
            Trang chủ
          </Text>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.btnCheckout}
            onPress={handleChangePassword}
          >
            <Text style={styles.btnCheckoutText}>Đổi mật khẩu</Text>
          </TouchableOpacity>
        </View>
      </View>
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
    width: 200,
    height: 160,
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
    backgroundColor: '#c22b21',
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
  btnBooking: {
    marginTop: 20,
    // backgroundColor: '#990000',
    padding: 10,
    borderRadius: 20,
    borderWidth: 1,
  },
  textBooking: {
    color: '#000',
    fontSize: 16,
    textAlign: 'center',
  },
});
