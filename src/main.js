import Vue from 'vue';
import Vuex from 'vuex';
import Vuelidate from 'vuelidate';
import VueLocalStorage from 'vue-ls';
import VTooltip from 'v-tooltip';

import App from './App';
import router from './router';

import store from './store';

// eslint-disable-next-line no-unused-vars
import { Vuedals, Component as Vuedal, Bus as VuedalsBus } from './components/ui/popoup-vuedals';

Vue.config.productionTip = false;

Vue.use(Vuedals);
Vue.use(VueLocalStorage);
Vue.use(Vuex);
Vue.use(Vuelidate);
Vue.use(VTooltip);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,       // implementation
  router,
  template: '<App/>',
  components: { App },
});
