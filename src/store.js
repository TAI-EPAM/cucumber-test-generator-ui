import Vue from 'vue';
import Vuex from 'vuex';

// Vue.use(VueLocalStorage);
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    debug: false,
    projects: [],
    suits: [],
    tags: [],
    auth: {
      isAuth: Vue.ls.get('isAuth', false),
      token: Vue.ls.get('token', null),
      user: null,
    },
    ui: {
      menuIsOpen: false,
      suitsLoad: false,
    },
    activeProject: null,
  },

  getters: {
    getSuits: state => state.activeProject.suits,
    getSuit: state => (suitId) => {
      if (suitId) {
        return state.activeProject.suits.filter(suit => suit.id === parseInt(suitId, 0))[0];
      }
      return false;
    },
    getCase: (state, getters) => (suitId, caseId) => {
      const suit = getters.getSuit(suitId);
      return suit.cases.filter(_case => _case.id === parseInt(caseId, 0))[0];
    },
    isAuth: state => state.auth.isAuth,
    getToken: (state, getters) => getters.isAuth && state.auth.token,
    getTags: state => state.tags,
    getProjects: state => state.projects,
    getProject: state => (entityId) => {
      if (entityId) {
        return state.projects.filter(entity => entity.id === parseInt(entityId, 0))[0];
      }
      return false;
    },
    getUI: state => state.ui,
    getActiveProject: state => state.activeProject,
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
      st.activeProject.suits.push(payload);
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
      const suitItem = state.activeProject.suits.filter(
        suit => suit.id === parseInt(payload.suitId, 0))[0];
      // Refactor this through object assign!!!
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
      const st = state;
      state.activeProject.suits.forEach((suit) => {
        if (suit.tags) {
          suit.tags.forEach((tag) => {
            tagsSet.add(tag);
          });
        }
      });
      st.tags = Array.from(tagsSet);
    },
    //* ************ PROJECTS ********** */
    setProjects(state, payload) {
      const st = state;
      st.projects = payload.data;
    },
    setActiveProject(state, payload) {
      const st = state;
      st.activeProject = payload.data;
    },
    //* ****** UI ****** */
    setMenuIsOpen(state, v) {
      const st = state;
      st.ui.menuIsOpen = v;
    },
  },

  actions: {

  },
});

export default store;
