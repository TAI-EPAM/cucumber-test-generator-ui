import axios from 'axios';

const axiosClient = axios.create({
  // eslint-disable-next-line no-undef
  baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:8080' : '',
});

export default axiosClient;
