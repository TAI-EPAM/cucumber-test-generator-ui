import Vue from 'vue';
import AxiosClient from '@/utils/httpClient';
import router from '../router/index';
import convertSteps from '../utils/convert';
/* eslint-disable */
export default {
  loginAsync({ commit }, entity) {
    const query = router.history.current.query;
    AxiosClient.post('/login', entity)
      .then((resp) => {
        if (resp.data.token) {
          commit('setToken', { token: `Bearer ${resp.data.token}` });
          Vue.ls.set('token', resp.data.token);
          Vue.ls.set('isAuth', 'true');
          AxiosClient.defaults.headers.authorization = `Bearer ${resp.data.token}`;
        }
        if (query && query.redirect) {
          router.push(
            {
              path: query.redirect,
            });
        }
      })
      .catch(() => {
      });
  },
  //* *************PROJECTS*******************/
  getProjectsAsync({ commit }) {
    return new Promise((resolve) => {
      AxiosClient.get('/projects')
        .then((response) => {
          commit('setProjects', { data: response.data });
          resolve();
        })
        .catch(() => {
        });
    });
  },
  getProjectByIdAsync({ commit }, projectId) {
    return new Promise((resolve) => {
      AxiosClient.get(`/projects/${projectId}`)
        .then((response) => {
          this.entity = response.data;
          commit('setActiveProject', { data: response.data });
          resolve();
        })
        .catch(() => {
        });
    });
  },
  //* ************SUITS***********************/
  getSuitsAsync({ commit, state }, { projectId }) {
    if (router.history.current.name === 'Login') return;
    AxiosClient.get(`/projects/${projectId}/suits/`)
      .then((response) => {
        commit('setSuits', { data: response.data });
      })
      .then(() => {
        commit('changeLoadingStatus', { isLoad: true });
      })
      .catch(() => {
      });
  },
  addSuitAsync({ commit }, { projectId, data }) {
    return new Promise((resolve) => {
      AxiosClient.post(`/projects/${projectId}/suits/`, data)
        .then((response) => {
          const sendData = data;
          sendData.id = response.data.id;
          commit('addSuit', sendData);
          resolve();
        })
        .catch(() => {
        });
    });
  },
  deleteSuitAsync({ commit }, { suitId, projectId }) {
    return new Promise((resolve) => {
      AxiosClient.delete(`/projects/${projectId}/suits/${suitId}`)
        .then(() => {
          commit('removeSuit', { suitId });
          resolve();
        })
        .catch(() => {
        });
    });
  },
  editSuitAsync({ commit }, { projectId, suitId, updateData }) {
    return new Promise((resolve) => {
      AxiosClient.put(`/projects/${projectId}/suits/${suitId}`, updateData)
        .then(() => {
          commit('updateSuit', updateData);
          resolve();
        })
        .catch(() => {
        });
    });
  },
  // deleteSuitsAsync(commit , { removeSuitsIds, projectId }) {
  //   debugger;
  //     AxiosClient.delete(`/projects/${projectId}/suits`)
  //       .then(() => {
  //         commit('deleteSuitsAsync', removeSuitsIds);
  //       })
  //       .catch(() => {
  //       });
  // },
  //* *************HISTORY******************** */
  getCaseHistoryAsync({ state, commit }, { projectId, suitId, caseId }) {
    return new Promise((resolve) => {
      AxiosClient.get(`/projects/${projectId}/suits/${suitId}/cases/${caseId}/versions`, { headers: { authorization: `Bearer ${state.auth.token}` } })
        .then(resp => resp.data.map(item => convertSteps(item)))
        .then((data) => {
          commit('setHistory', data);
          resolve();
        })
        .catch(() => {
        });
    });
  },
  //* *************CASES******************** */
  addCaseAsync({ commit }, { projectId, suitId, data }) {
    const sendData = Object.assign({}, data);
    sendData.creationDate = Date.now();
    sendData.updateDate = Date.now();
    return new Promise((resolve) => {
      AxiosClient.post(`/projects/${projectId}/suits/${suitId}/cases/`, data)
        .then((response) => {
          sendData.id = response.data.id;
          commit('addCase', { suitId, data: sendData });
          resolve();
        })
        .catch(() => {
        });
    });
  },
  updateCaseAsync({ commit }, { projectId, suitId, caseId, updateData }) {
    const sendData = Object.assign({}, updateData);
    sendData.action = 'UPDATE';
    return new Promise((resolve) => {
      AxiosClient.put(`/projects/${projectId}/suits/${suitId}/cases/${caseId}`, sendData)
        .then(() => {
          commit('updateCase', { suitId, caseId, updateData: sendData });
          resolve();
        })
        .catch(() => {
        });
    });
  },
  deleteCaseAsync({ commit }, { projectId, suitId, caseId }) {
    return new Promise((resolve) => {
      AxiosClient.delete(`/projects/${projectId}/suits/${suitId}/cases/${caseId}`)
        .then(() => {
          commit('removeCase', { suitId, caseId });
          commit('setHistory', []);
          resolve();
        })
        .catch(() => {
        });
    });
  },
  //* *************SUGGESTIONS******************** */
  getSuggestionsAsync({ state, commit }) {
    return new Promise((resolve) => {
      AxiosClient.get('/stepSuggestions', { headers: { authorization: `Bearer ${state.auth.token}` } })
        .then((response) => {
          const first = response.data.length - 7;
          const last = response.data.length;
          const res = response.data.slice(first, last);
          commit('step-suggestions', res);
          resolve();
        })
        .catch(() => {
        });
    });
  },
  getSuggestionsByStepTypeAsync({ state, commit }, type) {
    return AxiosClient.get(`/step-suggestions/${type}`, { headers: { authorization: `Bearer ${state.auth.token}` } })
      .then((response) => {
        const first = response.data.length >= 7 ? response.data.length - 7 : 0;
        const last = response.data.length;
        const res = response.data.slice(first, last);
        commit('step-suggestions', res);
      }).catch(() => {
      });
  },
  addSuggestionAsync({ state, commit }, data) {
    return new Promise((resolve) => {
      AxiosClient.post('/step-suggestions', data)
        .then((response) => {
          const sendData = Object.assign({}, data);
          sendData.id = response.data;
          commit('addSuggestion', sendData);
          resolve();
        })
        .catch(() => {
        });
    });
  },
  deleteSuggestionAsync({ state, commit }, suggestionId) {
    AxiosClient.delete(`/step-suggestions/${suggestionId}`, suggestionId)
      .then(() => {
        commit('deleteSuggestion', suggestionId);
      })
      .catch(() => {
      });
  },
  updateSuggestionAsync({ commit }, data) {
    AxiosClient.put(`/step-suggestions/${data.id}`, data)
      .then(() => {
        commit('updateSuggestion', data);
      })
      .catch(() => {
      });
  },
  //* *************REGISTRATION******************** */
  registerAsync(state, entity) {
    return AxiosClient.post('/user/registration', entity);
  },
  //* *************PASSWORD_FORGOT******************** */
  passwordForgotAsync(state, entity) {
    return AxiosClient.post('/user/passwordForgot', entity);
  },
  //* *************Generator_Button******************** */
  GeneratorButtonAsync(state, entity) {
    AxiosClient.post(`/projects/${entity.projectId}/feature-file`, entity.suitAndCaseIds,{ responseType: 'blob' })
      .then((response) => {
        const data = response.data;
        const fileName = "test.zip";
        const saveData = (function () {
          const a = document.createElement("a");
          document.body.appendChild(a);
          a.style = "display: none";
          return function (data, fileName) {
            if(response.request.readyState === 4){
              if(response.request.status === 200){
                const jsonSave = data,
                  blob = new Blob([jsonSave], {type: "application/octet-stream"}),
                  url = window.URL.createObjectURL(blob);
                a.href = url;
                a.download = fileName;
                a.click();
                window.URL.revokeObjectURL(url);
                document.body.removeChild(a);
              }
            } else {
              if(response.request.readyState === 2){
                if(response.request.status === 200) {
                  response.request.responseType = "blob";
                } else {
                  response.request.responseType = "text";
                }
              }
            }
          };
        }());
        saveData(data, fileName);
      })
      .catch(() => {
      });
  },
};
