import Vue from 'vue';
import App from './App';
import router from './router';
// eslint-disable-next-line no-unused-vars
import { Vuedals, Component as Vuedal, Bus as VuedalsBus } from './components/ui/popoup-vuedals';

Vue.config.productionTip = false;
// Vue.prototype.$bus = new Vue({});
Vue.use(Vuedals);

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
      Store.suits = data;
    },
    getSuits() {
      return Store.suits;
    },
    addSuit(suit) {
      Store.suits.push(suit);
    },
    getSuit(suitId) {
      if (suitId) {
        return Store.suits.filter(suit => suit.id === parseInt(suitId, 0))[0];
      }
      return false;
    },
    updateSuit(suitId, updateData) {
      const target = Store.suits.filter(suit => suit.id === parseInt(suitId, 0))[0];
      Object.assign(target, updateData);
    },
    getCase(suitId, caseId) {
      const suit = this.getSuit(suitId);
      return suit.cases.filter(_case => _case.id === parseInt(caseId, 0))[0];
    },
    updateCase(suitId, caseId, updateData) {
      const target = this.getCase(suitId, caseId);
      Object.assign(target, updateData);
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
