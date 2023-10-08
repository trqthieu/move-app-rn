import {
  View,
  Text,
  Button,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { Divider } from 'react-native-elements';
import { formatTime } from '../../utils';

export default function CinemaBookingList({ navigation, schedules, movie }) {
  const handleBooking = scheduleId => {
    navigation.navigate('BookingChairScreen', {
      scheduleId,
      movie: movie,
    });
  };
  return (
    <ScrollView>
      {schedules.map((schedule, index) => {
        return (
          <View style={styles.container} key={index}>
            <View style={styles.cinemaWrap}>
              <View style={styles.cinema}>
                <Text style={styles.cinemaName}>{schedule.cinemaName}</Text>
                <Text style={styles.cinemaRoom}>{schedule.roomName}</Text>
              </View>
              {/* <Icon name='heart' color='#a83232' size={24} /> */}
            </View>
            <View style={styles.timeWrap}>
              <Text style={styles.subtitle}>
                {movie?.[0]?.format} {movie?.[0]?.language}
              </Text>
              <View style={styles.time}>
                {schedule.time.map(item => {
                  return (
                    <TouchableOpacity
                      key={item.id}
                      activeOpacity={0.5}
                      onPress={() => handleBooking(item.id)}
                    >
                      <Text style={styles.timeItem}>
                        {formatTime(item.value)}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
            <Divider color='#ccc' width={1} />
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  cinemaWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cinema: {
    marginBottom: 10,
  },
  cinemaName: {
    fontWeight: 'bold',
  },
  time: {
    flexDirection: 'row',
  },
  timeItem: {
    padding: 5,
    fontWeight: '500',
    borderWidth: 1,
    borderColor: 'black',
    margin: 10,
    marginLeft: 0,
    borderRadius: 10,
  },
});
