import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  ToastAndroid,
} from 'react-native';
import Header from '../components/home/Header';
import request from '../api/request';
import { formatDate, formatDateTime, formatNumber } from '../utils';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import { Divider } from 'react-native-elements';

const MyTicketScreen = () => {
  const [myTickets, setMyTickets] = useState([]);
  const navigation = useNavigation();

  const handleCancelTicket = async ticketCode => {
    const response = await request.cancelTicket(ticketCode);
    if (response.data.success) {
      ToastAndroid.show('Hủy vé thành công!', ToastAndroid.SHORT);
      setTimeout(() => {
        navigation.navigate('HomeScreen');
      }, 1500);
    }
  };

  const getMyTickets = async () => {
    const responseTickets = await request.getMyTickets(true);
    setMyTickets(responseTickets.data);
  };
  useEffect(() => {
    getMyTickets();
  }, []);

  // Hàm xử lý sự kiện khi nút hủy vé được nhấn
  const showAlert = ticketCode => {
    // Thực hiện xử lý hủy vé ở đây
    // Ví dụ: Hiển thị thông báo hủy vé thành công
    Alert.alert(
      'Hủy vé?',
      `Bạn chắc chắn muốn hủy vé có mã: ${String(ticketCode).toUpperCase()}`,
      [
        {
          text: 'Hủy',
          onPress: () => {},
          style: 'cancel',
        },
        { text: 'Đồng ý', onPress: () => handleCancelTicket(ticketCode) },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.header}>Danh sách vé phim đã mua</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        {myTickets.map((ticket, index) => (
          <View key={index} style={styles.ticket}>
            <View style={styles.labelRow}>
              <Text style={styles.label}>Tên phim:</Text>
              <Text style={[styles.value, styles.textUpper]}>
                {ticket.movie}
              </Text>
            </View>

            <View style={styles.labelRow}>
              <Text style={styles.label}>Mã code:</Text>
              <Text style={[styles.value, styles.textUpper]}>
                {ticket.code}
              </Text>
            </View>

            <View style={styles.labelRow}>
              <Text style={styles.label}>Ngày đặt:</Text>
              <Text style={styles.value}>
                {formatDate(ticket.created_date)}
              </Text>
            </View>

            <View style={styles.labelRow}>
              <Text style={styles.label}>Ngày chiếu:</Text>
              <Text style={styles.value}>
                {formatDateTime(ticket.premiere)}
              </Text>
            </View>

            <View style={styles.labelRow}>
              <Text style={styles.label}>Rạp:</Text>
              <Text style={styles.value}>{ticket.cinema}</Text>
            </View>

            <View style={styles.labelRow}>
              <Text style={styles.label}>Phòng:</Text>
              <Text style={styles.value}>{ticket.room}</Text>
            </View>

            <View style={styles.labelRow}>
              <Text style={styles.label}>Ghế:</Text>
              <Text style={styles.value}>{ticket.chairs.join(', ')}</Text>
            </View>

            <View style={styles.labelRow}>
              <Text style={styles.label}>Giá vé:</Text>
              <Text style={styles.value}>{formatNumber(ticket.value)} đ</Text>
            </View>

            {ticket.is_cancel === 1 ? (
              <TouchableOpacity activeOpacity={1} style={styles.receiveButton}>
                <Text style={styles.cancelButtonText}>Vé đã bị hủy</Text>
              </TouchableOpacity>
            ) : moment().diff(ticket.premiere, 'milliseconds') < 0 ? (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                }}
              >
                <TouchableOpacity
                  onPress={() => showAlert(ticket.code)}
                  style={styles.cancelButton}
                >
                  <Text style={styles.cancelButtonText}>Hủy vé</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity activeOpacity={1} style={styles.receiveButton}>
                <Text style={styles.cancelButtonText}>Hủy vé</Text>
              </TouchableOpacity>
            )}
            <Divider width={1} color='#ccc' />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    padding: 16,
  },
  ticket: {
    marginBottom: 10,
    padding: 16,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  label: {
    fontWeight: 'bold',
    marginRight: 5,
  },
  textUpper: {
    textTransform: 'uppercase',
  },
  value: {},
  cancelButton: {
    backgroundColor: '#990000',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    width: 100,
    marginBottom: 10,
  },
  receiveButton: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 10,
  },
  cancelButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default MyTicketScreen;
