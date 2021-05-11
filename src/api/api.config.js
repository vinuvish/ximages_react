import Config from './config';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: Config.API_END_POINT,
  timeout: 30000, // 30 secs.
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
