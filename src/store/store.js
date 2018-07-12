import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';
import mutations from './mutations';
import actions from './actions';

// Vue.use(VueLocalStorage);
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    selectedObject: null,
    updateSteps: [],
    debug: false,
    projects: [],
    currentCommits: [],
    currentSuggestions: [],
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
    globalErrors: [],
    saveCaseForMove: null,
  },

  getters,
  mutations,
  actions,
});

export default store;

