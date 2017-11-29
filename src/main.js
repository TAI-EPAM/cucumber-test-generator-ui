import Vue from 'vue';
import App from './App';
import router from './router';

Vue.config.productionTip = false;
Vue.prototype.$bus = new Vue({});

/*
 Store implementation
*/

function createStore() {
  const Store = {
    debug: false,
    suits: [],
  };
  return {
    setSuits(data) {
      // if (Store.debug) console.log(data);
      Store.suits = data;
    },
    getSuits() {
      return Store.suits;
    },
    addSuit(suit) {
      Store.suits.push(suit);
    },
  };
}

Vue.prototype.$store = createStore();

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
});
