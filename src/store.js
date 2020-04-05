import Vue from 'vue';
import Vuex from 'vuex';
import { isMeetingModelValid } from './servicesApp/meetingValidator/meetingValidatorService';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    currentMeeting: {
      descriptionname: '',
      expectedStartTime: '',
      expectedEndTime: '',
      realStartTime: '',
      realEndTime: '',
      goals: [],
      description: '',
    },
  },
  getters: {
    currentMeeting(state) {
      return state.currentMeeting;
    },
    currentMeetingName(state) {
      return state.currentMeeting.name;
    },
    currentMeetingExpectedStartTime(state) {
      return state.currentMeeting.expectedStartTime;
    },
    currentMeetingExpectedEndTime(state) {
      return state.currentMeeting.expectedEndTime;
    },
    currentMeetingRealStartTime(state) {
      return state.currentMeeting.realStartTime;
    },
    currentMeetingRealEndTime(state) {
      return state.currentMeeting.realEndTime;
    },
    currentMeetingGoals(state) {
      return state.currentMeeting.goals;
    },
    currentMeetingDescription(state) {
      return state.currentMeeting.description;
    },
  },
  mutations: {
    updateCurrentMeeting(state, payload) {
      // eslint-disable-next-line no-restricted-syntax
      for (const [key, value] of Object.entries(payload)) {
        // eslint-disable-next-line no-prototype-builtins
        if (payload.hasOwnProperty(key)) {
          state.currentMeeting[key] = value;
        }
      }
    },
    updateRealStartTime(state, payload) {
      state.currentMeeting.realStartTime = payload;
    },
    updateRealEndTime(state, payload) {
      state.currentMeeting.realEndTime = payload;
    },
  },
  actions: {
    asyncUpdateCurrentMeeting({ commit, state }, payload) {
      if (isMeetingModelValid(payload)) {
        commit('updateCurrentMeeting', payload);
        setCurrentMeetingInLocalStorage(state.currentMeeting);
      }
    },
    asyncCleanCurrentMeeting({ commit }) {
      const emptyModel = {
        name: '',
        expectedStartTime: '',
        expectedEndTime: '',
        realStartTime: '',
        realEndTime: '',
        goals: [],
        description: '',
      };
      commit('updateCurrentMeeting', emptyModel);
      deleteCurrentMeetingInLocalStorage();
    },
    asyncUpdateRealStartTime({ commit, state }, payload) {
      commit('updateRealStartTime', payload);
      setCurrentMeetingInLocalStorage(state.currentMeeting);
    },
    asyncUpdateRealEndTime({ commit, state }, payload) {
      commit('updateRealEndTime', payload);
      setCurrentMeetingInLocalStorage(state.currentMeeting);
    },
  },
});

function deleteCurrentMeetingInLocalStorage() {
  localStorage.removeItem('tw-current-meeting');
}

function setCurrentMeetingInLocalStorage(meeting) {
  localStorage.setItem('tw-current-meeting', JSON.stringify(meeting));
}

function getCurrentMeetingFromLocalStorage() {
  return JSON.parse(localStorage.getItem('tw-current-meeting'));
}

function initStoreWithDataFromLocalStorage() {
  const initialCurrentMeeting = getCurrentMeetingFromLocalStorage();
  if (initialCurrentMeeting) {
    store.dispatch('asyncUpdateCurrentMeeting', { ...initialCurrentMeeting });
  }
}

// TODO: Analyse possible performance impact here
function setupWatcher() {
  store.watch(
    state => state.currentMeeting,
    newValue => {
      if (newValue.name) {
        setCurrentMeetingInLocalStorage(newValue);
      } else {
        deleteCurrentMeetingInLocalStorage();
      }
    },
    { deep: true },
  );
}

initStoreWithDataFromLocalStorage();
setupWatcher();

export default store;
