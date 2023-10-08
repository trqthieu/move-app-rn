import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons';

export default function UserInfo() {
  return (
    <View style={styles.container}>
      <View style={styles.userWrap}>
        <FAIcon name='bell' size={25} color='#fff' />
        <View style={styles.user}>
          <Image
            source={require('../../assets/images/avatar.jpg')}
            style={{
              width: 40,
              height: 40,
              resizeMode: 'contain',
              borderRadius: 20,
            }}
          />
          <Text style={styles.name}>Mathew Tran</Text>
        </View>
        <Icon name='settings' size={25} color='#fff' />
      </View>
      {/* <View style={styles.totalWrap}>
        <View style={styles.total}>
          <Text style={styles.totalText}>Tổng chi tiêu</Text>
          <Text style={styles.totalNumber}>0 đ</Text>
        </View>
        <View style={styles.total}>
          <Text style={styles.totalText}>Điểm thưởng</Text>
          <Text style={styles.totalNumber}>0</Text>
        </View>
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  userWrap: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 20,
    paddingBottom: 40,
  },
  user: {
    alignItems: 'center',
  },
  name: {
    color: '#fff',
    textAlign: 'center',
  },
  totalWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  total: {
    color: '#fff',
    textAlign: 'center',
    alignItems: 'center',
  },
  totalText: {
    color: '#fff',
  },
  totalNumber: {
    color: '#fff',
  },
});
