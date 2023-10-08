import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Header from '../components/home/Header';
import Sidebar from '../components/sidebar/Sidebar';
import request from '../api/request';
import { formatNumber } from '../utils/index';

const chairList = [
  ['A1', 'B1', 'C1', 'D1', 'E1', 'F1', 'G1', 'H1', 'I1', 'J1', 'K1'],
  ['A2', 'B2', 'C2', 'D2', 'E2', 'F2', 'G2', 'H2', 'I2', 'J2', 'K2'],
  ['A3', 'B3', 'C3', 'D3', 'E3', 'F3', 'G3', 'H3', 'I3', 'J3', 'K3'],
  ['A4', 'B4', 'C4', 'D4', 'E4', 'F4', 'G4', 'H4', 'I4', 'J4', 'K4'],
  ['A5', 'B5', 'C5', 'D5', 'E5', 'F5', 'G5', 'H5', 'I5', 'J5', 'K5'],
  ['A6', 'B6', 'C6', 'D6', 'E6', 'F6', 'G6', 'H6', 'I6', 'J6', 'K6'],
];

export default function BookingChairScreen({ navigation, route }) {
  const sidebar = useSelector(state => state.sidebar);
  const scheduleId = route.params.scheduleId;
  const movie = route.params.movie;
  const [selectingChair, setSelectingChair] = useState([]);
  const [selectedChair, setSelectedChair] = useState([]);
  const [amount, setAmount] = useState([]);
  const [totalMoney, setTotalMoney] = useState([0]);
  const [allChairs, setAllChairs] = useState([]);
  const [chairs, setChairs] = useState([]);
  const getAllChairs = async () => {
    const resultChair = await request.getAllChairs();
    const dataChair = resultChair.data;
    const data = [];
    dataChair.forEach(chair => {
      const { yPosition } = chair;
      if (data[yPosition - 1]) {
        data[yPosition - 1].push(chair);
      } else {
        data[yPosition - 1] = [];
        data[yPosition - 1].push(chair);
      }
    });
    setAllChairs(data);
    setChairs(dataChair);
  };

  const getSelectedChair = async scheduleId => {
    const resultSelectedChairs = await request.getChairsByScheduleId(
      scheduleId
    );
    setSelectedChair(resultSelectedChairs.data);
  };

  const getTimeTypeSchedule = async scheduleId => {
    const resultTime = await request.getTimeTypeSchedule(scheduleId);
    const { date_type, time_type, format_id } = resultTime.data[0];
    const resultAmount = await request.getAmount({
      date_type,
      time_type,
      format_id,
    });
    const { amount, amount_vip } = resultAmount.data[0];
    setAmount([amount, amount_vip]);
  };

  useEffect(() => {
    if (selectingChair.length) {
      const money = selectingChair
        .map(s => {
          const status = chairs.find(c => c.id === s.id).status;
          return amount[status];
        })
        .reduce((a, b) => a + b, 0);
      setTotalMoney(money);
    }
  }, [selectingChair]);

  useEffect(() => {
    getAllChairs();
    getSelectedChair(scheduleId);
    getTimeTypeSchedule(scheduleId);
  }, []);

  const handleBooking = () => {
    navigation.navigate('BookingFoodScreen', {
      movie,
      scheduleId,
      selectingChair,
      totalMoney,
    });
  };

  const handleSelectingChair = chair => {
    if (!selectingChair.find(chairItem => chairItem.id === chair.id)) {
      setSelectingChair([...selectingChair, chair]);
    } else {
      setSelectingChair(
        selectingChair.filter(chairItem => chairItem.id !== chair.id)
      );
    }
  };

  return (
    <View style={styles.container}>
      {/* <Header /> */}
      {/* {sidebar.open && <Sidebar />} */}
      <View>
        <Text style={styles.screen}>MÀN HÌNH</Text>
        {allChairs.length ? (
          <View style={styles.chairList}>
            {allChairs.map((row, rowIndex) => {
              return (
                <View style={styles.chairRow} key={rowIndex}>
                  {row.map((column, columnIndex) => {
                    return (
                      <TouchableOpacity
                        activeOpacity={
                          selectedChair.find(
                            chairItem => chairItem.chair_id === column.id
                          )
                            ? 1
                            : 0.5
                        }
                        style={[styles.chairColumn]}
                        key={columnIndex}
                        onPress={() =>
                          selectedChair.find(
                            chairItem => chairItem.chair_id === column.id
                          )
                            ? null
                            : handleSelectingChair(column)
                        }
                      >
                        <Text
                          style={[
                            styles.chairItem,
                            {
                              backgroundColor: selectedChair.find(
                                chairItem => chairItem.chair_id === column.id
                              )
                                ? '#f0ad4e'
                                : selectingChair.find(
                                    chairItem => chairItem.id === column.id
                                  )
                                ? '#d9534f'
                                : column.status === 1
                                ? '#5cb85c'
                                : '#ccc',
                            },
                          ]}
                        >
                          {column.xPosition}
                          {column.yPosition}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              );
            })}
          </View>
        ) : null}
        <View style={styles.chairOption}>
          <View style={styles.chairOptionLeft}>
            <View style={styles.chairOptionItem}>
              <View
                style={[styles.chairOptionBlock, styles.selectingChair]}
              ></View>
              <Text style={styles.chairOptionText}>Đang chọn</Text>
            </View>
            <View style={styles.chairOptionItem}>
              <View
                style={[styles.chairOptionBlock, styles.selectedChair]}
              ></View>
              <Text style={styles.chairOptionText}>Đã đặt</Text>
            </View>
          </View>
          <View style={styles.chairOptionRight}>
            <View style={styles.chairOptionItem}>
              <View
                style={[styles.chairOptionBlock, styles.normalChair]}
              ></View>
              <Text style={styles.chairOptionText}>Ghế thường</Text>
            </View>
            <View style={styles.chairOptionItem}>
              <View style={[styles.chairOptionBlock, styles.vipChair]}></View>
              <Text style={styles.chairOptionText}>Ghế vip</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.chairInfoWrap}>
        <View style={styles.movieWrap}>
          <Text style={styles.movieName}>{movie?.[0].name}</Text>
          <Text style={styles.movieLimitAge}>T{movie?.[0].ageLimit}</Text>
        </View>
        <View style={styles.movieSubtitleWrap}>
          <Text style={styles.movieSubtitle}>
            {movie?.[0].format} {movie?.[0].language}
          </Text>
          {selectingChair.length ? (
            <TouchableOpacity
              style={styles.btnBooking}
              activeOpacity={0.6}
              onPress={handleBooking}
            >
              <Text style={styles.btnBookingText}>Đặt vé</Text>
            </TouchableOpacity>
          ) : null}
        </View>
        <View style={styles.chairInfo}>
          <Text style={styles.chairPrice}>{formatNumber(totalMoney)} đ</Text>
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
