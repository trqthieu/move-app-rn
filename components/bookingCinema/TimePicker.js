import React, { useRef, useCallback, useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import {
  ExpandableCalendar,
  CalendarProvider,
  WeekCalendar,
  Calendar,
} from 'react-native-calendars';
import CinemaBookingList from './CinemaBookingList';
import request from '../../api/request';
import moment from 'moment';

const today = new Date().toISOString().split('T')[0];
const fastDate = getPastDate(3);
const futureDates = getFutureDates(12);
const dates = [fastDate, today].concat(futureDates);

function getFutureDates(numberOfDays) {
  const array = [];
  for (let index = 1; index <= numberOfDays; index++) {
    let d = Date.now();
    if (index > 8) {
      const newMonth = new Date(d).getMonth() + 1;
      d = new Date(d).setMonth(newMonth);
    }
    const date = new Date(d + 864e5 * index);
    const dateString = date.toISOString().split('T')[0];
    array.push(dateString);
  }
  return array;
}
function getPastDate(numberOfDays) {
  return new Date(Date.now() - 864e5 * numberOfDays)
    .toISOString()
    .split('T')[0];
}
function groupSchedule(data) {
  const groupedData = data.reduce((acc, obj) => {
    const date = moment(obj.premiere).add(7, 'hours');
    const key = obj.room_id + date.format('DD/MM/YYYY');
    if (!acc[key]) {
      acc[key] = {
        room_id: obj.room_id,
        premiere: obj.premiere,
        roomName: obj.roomName,
        cinemaName: obj.cinemaName,
        time: [
          {
            id: obj.id,
            value: obj.premiere,
          },
        ],
      };
    } else {
      acc[key].time.push({
        id: obj.id,
        value: obj.premiere,
      });
    }
    return acc;
  }, {});
  const resultArray = Object.values(groupedData);
  return resultArray;
}

const TimePicker = ({ navigation, movieId, ...props }) => {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [schedules, setSchedules] = useState([]);
  const [movie, setMovie] = useState();

  const getSchedule = async (day, movieId) => {
    const responseSchedule = await request.getSchedulesOfMovieByDate(
      day,
      movieId
    );
    setSchedules(groupSchedule(responseSchedule.data));
    const responseFormat = await request.getMovieById(movieId);
    setMovie(responseFormat.data);
  };

  useEffect(() => {
    getSchedule(selectedDate, movieId);
  }, [selectedDate]);

  const onDateChanged = useCallback((date, updateSource) => {
    setSelectedDate(date);
  }, []);

  return (
    <CalendarProvider
      date={dates[1]}
      onDateChanged={onDateChanged}
      showTodayButton
    >
      <WeekCalendar
        today
        theme={{
          selectedDayBackgroundColor: '#990000',
          todayTextColor: '#990000',
        }}
      />
      {schedules.length ? (
        <CinemaBookingList
          navigation={navigation}
          schedules={schedules}
          movie={movie}
        />
      ) : (
        <Text
          style={{
            fontSize: 16,
            padding: 20,
          }}
        >
          Xin lỗi, ngày này hiện chưa có lịch chiếu
        </Text>
      )}

      {/* <Calendar /> */}
    </CalendarProvider>
  );
};

export default TimePicker;
