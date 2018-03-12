import axios from 'axios';
import Vue from 'vue';
import VueLocalStorage from 'vue-ls';
import Vuex from 'vuex';
import store from '../store/store';

Vue.use(Vuex);
Vue.use(VueLocalStorage);

const axiosClient = axios.create({
  // eslint-disable-next-line no-undef
  baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:8080/cucumber' : '',
  headers: { authorization: Vue.ls.get('token') },
});


axiosClient.interceptors.response.use(response => response,
  (error) => {
    store.commit('setGlobalError', error);
    return Promise.reject(error);
  },
);

export default axiosClient;
