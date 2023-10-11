import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Pressable,
  Alert,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import request from '../api/request';
import Markdown from 'react-native-easy-markdown';
import MarkdownToComponent from '../components/react-native-simple-markdown';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAweSome from 'react-native-vector-icons/FontAwesome';
import YoutubePlayer from 'react-native-youtube-iframe';
import { TextInput } from 'react-native-gesture-handler';

export default function NewsDetailScreen({ navigation, route }) {
  const { newsId } = route.params;
  const [newsData, setNewsData] = useState({});
  const [like, setLike] = useState([]);
  const [comment, setComment] = useState([]);
  const [myInfo, setMyInfo] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [textComment, setTextComment] = useState('');
  const [loading, setLoading] = useState(false);

  const getNewsData = async () => {
    const responseNews = await request.getNewsById(newsId);
    setNewsData(responseNews.data[0]);
  };
  const handleLikeNews = async newsId => {
    const responseLike = await request.likeNews(newsId);
    await getNewsInfo(newsId);
  };

  const handleCommentNews = async () => {
    if (!textComment.trim().length) {
      return;
    }
    setLoading(true);
    const responseComment = await request.commentNews(newsId, textComment);
    await getNewsInfo(newsId);
    setTextComment('');
    setLoading(false);
  };

  const getNewsInfo = async newsId => {
    const responseInfo = await request.getMyInfo();
    setMyInfo(responseInfo.data[0]);
    const responseLikeNews = await request.getLikeNews(newsId);
    setLike(responseLikeNews.data);
    const responseCommentNews = await request.getCommentNews(newsId);
    setComment(responseCommentNews.data);
  };
  useEffect(() => {
    getNewsInfo(newsId);
  }, []);

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
                  <TouchableOpacity
                    style={styles.btnAction}
                    onPress={() => handleLikeNews(newsData.id)}
                  >
                    <Icon
                      name='heart'
                      color={
                        like.find(item => item.user_id === myInfo.id)
                          ? 'red'
                          : '#4e6161'
                      }
                      size={24}
                      style={styles.actionIcon}
                    />
                  </TouchableOpacity>
                  {like.length ? <Text>{like.length}</Text> : <Text>{''}</Text>}
                </View>
                <View style={styles.actionItem}>
                  <TouchableOpacity
                    style={styles.btnAction}
                    onPress={() => setModalVisible(true)}
                  >
                    <FontAweSome
                      name='comment'
                      color='#4e6161'
                      size={24}
                      style={styles.actionIcon}
                    />
                  </TouchableOpacity>
                  {comment.length ? (
                    <Text>{comment.length}</Text>
                  ) : (
                    <Text>{''}</Text>
                  )}
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
                  <Text>{''}</Text>
                </View>
                <Modal
                  animationType='fade'
                  transparent={true}
                  visible={modalVisible}
                  onRequestClose={() => {
                    setModalVisible(!modalVisible);
                  }}
                >
                  <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                      <View style={styles.modalViewHeader}>
                        <Text style={styles.modalText}>Bình luận</Text>
                        <Pressable
                          style={[styles.button, styles.buttonClose]}
                          onPress={() => setModalVisible(!modalVisible)}
                        >
                          <Text style={styles.textStyle}>Đóng</Text>
                        </Pressable>
                      </View>
                      <ScrollView
                        style={styles.modalViewContent}
                        showsVerticalScrollIndicator={false}
                      >
                        {comment.length ? (
                          comment.map((commentItem, index) => {
                            return (
                              <View style={styles.commentItem} key={index}>
                                <Image
                                  style={styles.commentItemImage}
                                  source={
                                    commentItem.avatar
                                      ? { uri: commentItem.avatar }
                                      : require('../assets/images/avatar.jpg')
                                  }
                                />
                                <Text>{commentItem.content}</Text>
                              </View>
                            );
                          })
                        ) : (
                          <Text>Chưa có bình luận nào</Text>
                        )}
                      </ScrollView>
                      <View style={styles.commentForm}>
                        <TextInput
                          editable={!loading}
                          style={styles.commentFormText}
                          value={textComment}
                          onChangeText={text => setTextComment(text)}
                        />
                        <TouchableOpacity
                          disabled={loading}
                          style={[styles.button, styles.buttonClose]}
                          onPress={handleCommentNews}
                        >
                          <Text style={styles.textStyle}>Bình luận</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </Modal>
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
  commentItem: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 10,
  },
  commentItemImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    // flex: 1,
    width: '90%',
    height: '80%',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    // alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalViewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    alignSelf: 'flex-end',
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  commentForm: {
    // backgroundColor: '#ccc',
  },
  commentFormText: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
  },
});
