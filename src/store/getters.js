export default {
  isAuth: state => state.auth.isAuth,
  isLoaded: state => state.dataIsLoaded,
  getToken: (state, getters) => getters.isAuth && state.auth.token,
  getTags: state => state.tags,
  getProjects: state => state.projects,
  getProjectById: state => (entityId) => {
    if (entityId) {
      return state.projects.filter(entity => entity.id === parseInt(entityId, 0))[0];
    }
    return false;
  },
  getUI: state => state.ui,
  getActiveProject: state => state.activeProject,
  getActiveSuits: (state) => {
    if (state.activeProject) {
      return state.activeProject.suits;
    } return null;
  },
  getCountActiveSuits: (state) => {
    if (state.activeProject) {
      return state.activeProject.suits.length;
    } return null;
  },
  getActiveSuitById: state => (suitId) => {
    if (suitId) {
      return state.activeProject.suits.filter(suit => suit.id === parseInt(suitId, 0))[0];
    }
    return false;
  },
  getActiveCaseById: (state, getters) => (suitId, caseId) => {
    const suit = getters.getActiveSuitById(suitId);
    if (suit) {
      return suit.cases.filter(_case => _case.id === parseInt(caseId, 0))[0];
    }
    return false;
  },
  getCurrentCommits: state => state.currentCommits,
  getCurrentSuggestions: state => state.currentSuggestions,
  getGlobalErrors: state => state.globalErrors,
  getSelectObject: state => state.selectedObject,
  getUpdateSteps: state => state.updateSteps,
  getSaveCaseForMove: state =>state.saveCaseForMove,
};
