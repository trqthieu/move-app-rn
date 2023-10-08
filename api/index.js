import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const axiosClient = axios.create({
  baseURL: 'http://192.168.0.240:8080',
});
axiosClient.interceptors.request.use(
  async config => {
    const accessToken = await AsyncStorage.getItem('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  error => {
    Promise.reject(error);
  }
);

export default axiosClient;
