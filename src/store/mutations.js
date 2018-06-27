import Vue from 'vue';
import tagsGetter from '../utils/tagsGetter';


export default {
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
  //* ************ PROJECTS ********** */
  setProjects(state, { data }) {
    const st = state;
    st.projects = data;
  },
  setActiveProject(state, payload) {
    const st = state;
    st.activeProject = payload.data;
    st.tags = Array.from(tagsGetter(st.activeProject.suits));
  },
  //* ************SUITS***********************/
  setSuits(state, payload) {
    const st = state;
    st.activeProject.suits = payload.data;

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
    const data = { ...payload, ...{ cases: [] } };
    st.activeProject.suits.push(data);
  },
  updateSuit(state, payload) {
    const target = state.activeProject.suits.filter(suit =>
    suit.id === payload.id)[0];
    Object.assign(target, payload);
  },
  removeSuit(state, payload) {
    const st = state;
    st.activeProject.suits = state.activeProject.suits.filter(suit => suit.id !== payload.suitId);
  },
  removeSuits(state, payload) {
    const st = state;
    st.activeProject.suits = state.activeProject.suits.filter(suit => !payload.removeSuitsIds.includes(suit.id));
  },

  //* *************CASES******************** */
  addCase(state, payload) {
    const caseItem = payload.data;
    const suitItem = state.activeProject.suits.filter(suit => suit.id === payload.suitId)[0];
    caseItem.steps = [];
    suitItem.cases.push(caseItem);
  },
  updateCase(state, { suitId, caseId, updateData }) {
    const targetSuit = state.activeProject.suits.filter(suit => +suit.id === +suitId)[0];
    const targetCase = targetSuit.cases.filter(item => +item.id === +caseId)[0];
    Object.assign(targetCase, updateData);
  },
  removeCase(state, payload) {
    const suitItem = state.activeProject.suits.find(suit => suit.id === parseInt(payload.suitId, 0));
    suitItem.cases = suitItem.cases.filter(item => !payload.removeCaseIds.includes(item.id));
  },
  //* **************HISTORY********************/
  setHistory(state, data) {
    const st = state;
    st.currentCommits = data;
  },
  //* **************SUGGESTIONS********************/
  setSuggestions(state, data) {
    const st = state;
    if (st.currentSuggestions) {
      st.currentSuggestions = data;
    } else {
      st.currentSuggestions = [data];
    }
  },
  addSuggestion(state, data) {
    const st = state;
    st.currentSuggestions.push(data);
  },
  deleteSuggestion(state, id) {
    const st = state;
    st.currentSuggestions.splice(st.currentSuggestions.findIndex(item => item.id === id), 1);
  },
  updateSuggestion(state, data) {
    const st = state;
    const target = st.currentSuggestions.find(item => item.id === data.id);
    Object.assign(target, data);
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
  //* ****** UI ****** */
  setMenuIsOpen(state, v) {
    const st = state;
    st.ui.menuIsOpen = v;
  },
  //* ****** GlobalError ****** */
  setGlobalError(state, data) {
    const st = state;
    st.globalErrors.push(data);
  },
  removeGlobalError(state, index) {
    const st = state;
    st.globalErrors.splice(index, 1);
  },
};
