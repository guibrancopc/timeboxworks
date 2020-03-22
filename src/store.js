import Vue from 'vue';
import Vuex from 'vuex';
import { isMeetingModelValid } from './services/meetingValidator/meetingValidatorService';

Vue.use(Vuex);

const initialCurrentMeeting = getCurrentMeetingFromLocalStorage() || {};

export default new Vuex.Store({
  state: {
    currentMeeting: {
      name: initialCurrentMeeting.name || '',
      expectedStartTime: initialCurrentMeeting.expectedStartTime || '',
      expectedEndTime: initialCurrentMeeting.expectedEndTime || '',
      realStartTime: initialCurrentMeeting.realStartTime || '',
      realEndTime: initialCurrentMeeting.realEndTime || '',
      goals: initialCurrentMeeting.goals || [],
      description: initialCurrentMeeting.description || '',
    },
  },
  getters: {
    currentMeeting(state) {
      return state.currentMeeting;
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
      } else {
        console.error('Wrong meeting model was received in Store!');
      }
    },
    asyncCleanCurrentMeeting({ commit, state }) {
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
      setCurrentMeetingInLocalStorage(state.currentMeeting);
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

function setCurrentMeetingInLocalStorage(meeting) {
  localStorage.setItem('tw-current-meeting', JSON.stringify(meeting));
}

function getCurrentMeetingFromLocalStorage() {
  return JSON.parse(localStorage.getItem('tw-current-meeting'));
}
