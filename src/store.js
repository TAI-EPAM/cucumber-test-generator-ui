import Vue from 'vue';
import Vuex from 'vuex';
import PROJECT_ID from '@/utils/projectID';
import AxiosClient from '@/utils/httpClient';
import router from './router/index';


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
    getSuits: state => state.suits,
    getCountSuits: state => state.suits.length,
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
    isLoaded: state => state.dataIsLoaded,
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
    changeLoadingStatus(state, payload) {
      const st = state;
      st.dataIsLoaded = payload.isLoad;
    },
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
        suit.id === payload.id)[0];
      Object.assign(target, payload);
    },
    removeSuit(state, payload) {
      console.log(payload.suitId);
      const st = state;
      st.suits = state.suits.filter(suit => suit.id !== payload.suitId);
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
      const suitItem = state.suits.filter(suit => suit.id === parseInt(payload.suitId, 0))[0];
      suitItem.cases = suitItem.cases.filter(item => item.id !== payload.caseId);
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
    loginAsync({ commit }, entity) {
      const query = router.history.current.query;
      AxiosClient.post('/cucumber/login', entity)
        .then((resp) => {
          if (resp.data.token) {
            commit('setToken', { token: resp.data.token });
            Vue.ls.set('token', resp.data.token);
            Vue.ls.set('isAuth', 'true');
          }
          if (query && query.redirect) {
            router.push(
              {
                path: query.redirect,
              });
          }
        })
        .catch((err) => {
          console.warn(err);
        });
    },
    //* ************SUITS***********************/
    getSuitsAsync({ commit, state }) {
      console.log(router);
      if (router.history.current.name === 'Login') return;
      AxiosClient.get(`/cucumber/projects/${PROJECT_ID}/suits/`, { headers: { authorization: state.auth.token } })
        .then((response) => {
          commit('setSuits', { data: response.data });
        })
        .then(() => {
          commit('changeLoadingStatus', { isLoad: true });
        })
        .catch((err) => {
          console.warn(err);
        });
    },
    addSuitAsync({ commit }, data) {
      return new Promise((resolve) => {
        AxiosClient.post(`/cucumber/projects/${PROJECT_ID}/suits/`, data)
          .then((response) => {
            const sendData = data;
            sendData.id = response.data;
            commit('addSuit', sendData);
            resolve();
          })
          .catch((err) => {
            console.warn(err);
          });
      });
    },
    deleteSuitAsync({ commit }, id) {
      return new Promise((resolve) => {
        AxiosClient.delete(`/cucumber/projects/${PROJECT_ID}/suits/${id}`)
          .then(() => {
            commit('removeSuit', { suitId: id });
            resolve();
          })
          .catch((err) => {
            console.warn(err);
          });
      });
    },
    editSuitAsync({ commit }, data) {
      return new Promise((resolve) => {
        AxiosClient.put(`/cucumber/projects/${PROJECT_ID}/suits/${data.id}`, data)
          .then(() => {
            commit('updateSuit', data);
            resolve();
          })
          .catch((err) => {
            console.warn(err);
          });
      });
    },
    //* *************HISTORY******************** */
    getCaseHistoryAsync({ state }, payload) {
      return AxiosClient.get(`/cucumber/projects/${PROJECT_ID}/suits/${payload.suitId}/cases/${payload.caseId}/versions`, { headers: { authorization: state.auth.token } })
            .catch((err) => { console.warn(err); });
    },
  },
});

export default store;

