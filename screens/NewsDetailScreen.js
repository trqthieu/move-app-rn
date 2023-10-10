import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import request from '../api/request';
import Markdown from 'react-native-easy-markdown';
import MarkdownToComponent from '../components/react-native-simple-markdown';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAweSome from 'react-native-vector-icons/FontAwesome';
import YoutubePlayer from 'react-native-youtube-iframe';

export default function NewsDetailScreen({ navigation, route }) {
  const { newsId } = route.params;
  const [newsData, setNewsData] = useState({});
  const getNewsData = async () => {
    const responseNews = await request.getNewsById(newsId);
    setNewsData(responseNews.data[0]);
  };

  useEffect(() => {
    getNewsData();
  }, []);

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      {newsData ? (
        <View style={styles.container}>
          <View>
            <Text style={styles.title}>{newsData.title}</Text>
            {newsData.type === 'VIDEO' ? (
              <YoutubePlayer
                height={220}
                play={true}
                videoId={newsData.video_key}
              />
            ) : (
              <Image source={{ uri: newsData.image }} style={styles.image} />
            )}
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.content}>{newsData.content}</Text>
            {newsData.type === 'NEWS' ? (
              <View style={styles.action}>
                <View style={styles.actionItem}>
                  <TouchableOpacity style={styles.btnAction}>
                    <Icon
                      name='heart'
                      color='#4e6161'
                      size={24}
                      style={styles.actionIcon}
                    />
                  </TouchableOpacity>
                  {/* <Text>200</Text> */}
                </View>
                <View style={styles.actionItem}>
                  <TouchableOpacity style={styles.btnAction}>
                    <FontAweSome
                      name='comment'
                      color='#4e6161'
                      size={24}
                      style={styles.actionIcon}
                    />
                  </TouchableOpacity>
                  {/* <Text>200</Text> */}
                </View>
                <View style={styles.actionItem}>
                  <TouchableOpacity style={styles.btnAction}>
                    <Icon
                      name='share'
                      color='#4e6161'
                      size={24}
                      style={styles.actionIcon}
                    />
                  </TouchableOpacity>
                  {/* <Text>200</Text> */}
                </View>
              </View>
            ) : null}
          </ScrollView>
          {/* <MarkdownToComponent markdownText={newsData.content} /> */}
        </View>
      ) : null}
      {/* <Markdown>{newsData?.content}</Markdown> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  content: {
    marginTop: 20,
  },
  action: {
    marginTop: 40,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  btnAction: {
    // padding: 10,
  },
  actionItem: { justifyContent: 'center', alignItems: 'center' },
  actionIcon: {
    padding: 10,
    paddingBottom: 0,
  },
});
