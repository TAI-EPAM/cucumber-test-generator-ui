import Vue from 'vue';
import VueLocalStorage from 'vue-ls';
import App from './App';
import router from './router';
// eslint-disable-next-line no-unused-vars
import { Vuedals, Component as Vuedal, Bus as VuedalsBus } from './components/ui/popoup-vuedals';

Vue.config.productionTip = false;
Vue.use(Vuedals);
Vue.use(VueLocalStorage);

/*
 Store implementation
*/

function createStore() {
  const Store = {
    debug: false,
    suits: [],
    auth: {
      isAuth: Vue.ls.get('isAuth', false),
      token: Vue.ls.get('token', null),
      user: null,
    },
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
    removeSuit(suitId) {
      const suitItem = Store.suits.filter(suit => suit.id === parseInt(suitId, 0))[0];
      Store.suits.splice(Store.suits.indexOf(suitItem), 1);
    },
    addCase(suitId, data) {
      const suitItem = Store.suits.filter(suit => suit.id === parseInt(suitId, 0))[0];
      if (suitItem.cases) {
        suitItem.cases.push(data);
      } else {
        suitItem.cases = [data];
      }
    },
    getCase(suitId, caseId) {
      const suit = this.getSuit(suitId);
      return suit.cases.filter(_case => _case.id === parseInt(caseId, 0))[0];
    },
    updateCase(suitId, caseId, updateData) {
      const target = this.getCase(suitId, caseId);
      Object.assign(target, updateData);
    },
    removeCase(suitId, caseId) {
      const suitItem = this.getSuit(suitId);
      const caseItem = this.getCase(suitId, caseId);
      suitItem.cases.splice(suitItem.cases.indexOf(caseItem), 1);
    },
    isAuth() {
      return Store.auth.isAuth;
    },
    setToken(token) {
      Store.auth.token = token;
      Store.auth.isAuth = true;
    },
    getToken() {
      return this.isAuth() && Store.auth.token;
    },
    logout() {
      Store.auth.token = null;
      Store.auth.isAuth = false;
      Vue.ls.remove('isAuth');
      Vue.ls.remove('token');
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
