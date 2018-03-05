import axios from 'axios';
import Vue from 'vue';
import VueLocalStorage from 'vue-ls';

Vue.use(VueLocalStorage);
const axiosClient = axios.create({
  // eslint-disable-next-line no-undef
  baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:8080' : '',
  headers: { authorization: Vue.ls.get('token') },
});

export default axiosClient;
