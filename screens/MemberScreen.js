import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';
import Header from '../components/home/Header';
import MemberUser from '../components/member/MemberUser';
import MemberMenu from '../components/member/MemberMenu';

export default function MemberScreen() {
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>
        {/* <MemberUser /> */}
        <MemberMenu />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 0,
    top: 0,
    height: '100%',
    width: '100%',
  },
  content: {
    // height: '100%',
    // backgroundColor: 'rgba(0,0,0,0.9)',
    // position: 'absolute',
    // width: '80%',
    // right: 0,
  },
  btnLogout: {
    textAlign: 'center',
    color: '#fff',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
});
