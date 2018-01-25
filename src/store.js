import Vue from 'vue';
import Vuex from 'vuex';

// Vue.use(VueLocalStorage);
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    debug: false,
    suits: [],
    tags: null,
    auth: {
      isAuth: Vue.ls.get('isAuth', false),
      token: Vue.ls.get('token', null),
      user: null,
    },
  },

  getters: {
    getSuits: state => state.suits,
    getSuit: state => (suitId) => {
      if (suitId) {
        return state.suits.filter(suit => suit.id === parseInt(suitId, 0))[0];
      }
      return false;
    },
    getCase: (state, getters) => (suitId, caseId) => {
      const suit = getters.getSuit(suitId);
      return suit.cases.filter(_case => _case.id === parseInt(caseId, 0))[0];
    },
    isAuth: state => state.auth.isAuth,
    getToken: (state, getters) => getters.isAuth && state.auth.token,      //
    getTags: state => state.tags,
  },

  mutations: {
    //* *****************AUTH*********************/
    logout(state) {
      const st = state;
      st.auth.token = null;
      st.auth.isAuth = false;
      Vue.ls.remove('isAuth');
      Vue.ls.remove('token');
    },
    setToken(state, payload) {
      const st = state;
      st.auth.token = payload.token;
      st.auth.isAuth = true;
    },
    //* ************SUITS***********************/
    setSuits(state, payload) {
      console.log('I AM HERE');
      const st = state;
      st.suits = payload.data;

      const tagsSet = new Set();
      state.suits.forEach((suit) => {
        if (suit.tags) {
          suit.tags.forEach((tag) => {
            tagsSet.add(tag);
          });
        }
      });
      st.tags = Array.from(tagsSet);
    },

    addSuit(state, payload) {
      const st = state;
      st.suits.push(payload.suit);
    },
    updateSuit(state, payload) {
      const target = state.suits.filter(suit =>
             suit.id === parseInt(payload.suitId, 0))[0];
      Object.assign(target, payload.updateData);
    },
    removeSuit(state, payload) {
      const st = state;
      const suitItem = state.suits.filter(suit => suit.id === parseInt(payload.suitId, 0))[0];
      st.suits.splice(state.suits.indexOf(suitItem), 1);
    },
    //* *************CASES******************** */
    addCase(state, payload) {
      const suitItem = state.suits.filter(suit => suit.id === parseInt(payload.suitId, 0))[0];
      if (suitItem.cases) {
        suitItem.cases.push(payload.data);
      } else {
        suitItem.cases = [payload.data];
      }
    },

    updateCase(state, payload) {
      const target = this.getCase(payload.suitId, payload.caseId);
      Object.assign(target, payload.updateData);
    },
    removeCase(state, payload) {
      const suitItem = this.getSuit(payload.suitId);
      const caseItem = this.getCase(payload.suitId, payload.caseId);
      suitItem.cases.splice(suitItem.cases.indexOf(caseItem), 1);
    },
    //* **************TAGS******************** */
    createTags(state) {
      const tagsSet = new Set();
      state.suits.forEach((suit) => {
        if (suit.tags) {
          suit.tags.forEach((tag) => {
            tagsSet.add(tag);
          });
        }
      });
      const st = state;
      st.tags = Array.from(tagsSet);
    },

  },

  actions: {

  },
});

export default store;

