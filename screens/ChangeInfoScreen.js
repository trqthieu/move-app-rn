import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Button,
  ToastAndroid,
} from 'react-native';
import React, { useEffect } from 'react';
import SelectDropdown from 'react-native-select-dropdown';
const countries = ['Egypt', 'Canada', 'Australia', 'Ireland'];
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import request from '../api/request';
import { isValidEmail } from '../utils';

export default function ChangeInfoScreen({ navigation }) {
  const [gender, setGender] = useState([
    { title: 'Nam', value: 1 },
    {
      title: 'Nữ',
      value: 0,
    },
  ]);

  const [data, setData] = useState({
    fullName: '',
    email: '',
    address: '',
    dob: new Date(),
    gender: '',
  });
  console.log('data', data);

  useEffect(() => {
    getMyInfo();
  }, []);

  const getMyInfo = async () => {
    const responseInfo = await request.getMyInfo();
    const data = responseInfo.data[0];
    setData({
      fullName: data.fullName,
      email: data.email,
      address: data.address,
      dob: new Date(data.dateOfBirth),
      gender: data.gender,
    });
  };

  const [date, setDate] = useState(new Date()); // Initial date value
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios'); // On iOS, always show the picker
    // setDate(currentDate);
    setData({
      ...data,
      dob: currentDate,
    });
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const handleUpdate = async () => {
    const { fullName, dob: dateOfBirth, address, gender, avatar } = data;
    if (!fullName.trim().length || !address.trim().length) {
      ToastAndroid.show('Vui lòng điền đầy đủ thông tin', ToastAndroid.SHORT);
      return;
    }

    const responseUpdate = await request.updateMyInfo({
      fullName,
      dateOfBirth: moment(dateOfBirth).format('YYYY-MM-DD'),
      address,
      gender,
      avatar,
    });
    if (responseUpdate.data.success) {
      ToastAndroid.show('Cập nhật thành công', ToastAndroid.SHORT);
      navigation.navigate('HomeScreen');
    } else {
      ToastAndroid.show(responseUpdate.data.data.message, ToastAndroid.SHORT);
    }
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
        {/* <View style={styles.time}>
          <Icon name='time' color='#000' size={20} />
          <Text style={styles.timeValue}>09:59</Text>
        </View> */}
      </View>
      <View style={styles.formCard}>
        <View style={styles.formCardRow}>
          <View style={styles.formCardItemFull}>
            <Text style={styles.formCardItemText}>Họ tên</Text>
            <TextInput
              style={styles.formCardItemInput}
              value={data.fullName}
              onChangeText={text =>
                setData({
                  ...data,
                  fullName: text,
                })
              }
            />
          </View>
        </View>
        <View style={styles.formCardRow}>
          <View style={styles.formCardItemFull}>
            <Text style={styles.formCardItemText}>Địa chỉ</Text>
            <TextInput
              style={styles.formCardItemInput}
              value={data.address}
              onChangeText={text =>
                setData({
                  ...data,
                  address: text,
                })
              }
            />
          </View>
        </View>
        <View style={styles.formCardRow}>
          <View style={styles.formCardItemFull}>
            <Text style={styles.formCardItemText}>Email</Text>
            <TextInput
              editable={false}
              style={styles.formCardItemInput}
              value={data.email}
              onChangeText={text =>
                setData({
                  ...data,
                  email: text.trim(),
                })
              }
            />
          </View>
        </View>
        <View style={styles.formCardRow}>
          <View style={styles.formCardItem}>
            <Text style={styles.formCardItemText}>Ngày sinh</Text>
            <TouchableOpacity onPress={showDatepicker}>
              <TextInput
                style={styles.formCardItemInput}
                editable={false}
                value={moment(data.dob).format('DD/MM/YYYY')}
              />
              {showDatePicker && (
                <DateTimePicker
                  testID='dateTimePicker'
                  value={date}
                  mode='date' // You can change this to 'time' or 'datetime' if needed
                  display='default'
                  onChange={onChange}
                />
              )}
            </TouchableOpacity>
          </View>
          <View style={styles.formCardItem}>
            <Text style={styles.formCardItemText}>Giới tính</Text>
            <SelectDropdown
              data={gender}
              onSelect={(selectedItem, index) => {
                setData({
                  ...data,
                  gender: selectedItem.value,
                });
              }}
              defaultButtonText={'Chọn giới tính'}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem.title;
              }}
              rowTextForSelection={(item, index) => {
                return item.title;
              }}
              buttonStyle={styles.dropdown1BtnStyle}
              buttonTextStyle={styles.dropdown1BtnTxtStyle}
              renderDropdownIcon={isOpened => {
                return (
                  <FontAwesome name={'chevron-down'} color={'#444'} size={12} />
                );
              }}
              dropdownIconPosition={'right'}
              dropdownStyle={styles.dropdown1DropdownStyle}
              rowStyle={styles.dropdown1RowStyle}
              rowTextStyle={styles.dropdown1RowTxtStyle}
            />
          </View>
        </View>

        <View style={styles.checkoutWrap}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.btnCheckout}
            onPress={handleUpdate}
          >
            <Text style={styles.btnCheckoutText}>Cập nhật</Text>
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
  dropdown1BtnStyle: {
    flex: 1,
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#444',
    width: '100%',
  },
  dropdown1BtnTxtStyle: { color: '#444', textAlign: 'left', fontSize: 14 },
  dropdown1DropdownStyle: { backgroundColor: '#EFEFEF' },
  dropdown1RowStyle: {
    backgroundColor: '#EFEFEF',
    borderBottomColor: '#C5C5C5',
  },
  dropdown1RowTxtStyle: { color: '#444', textAlign: 'left' },
});
