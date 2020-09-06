import Vue from 'vue';
import Vuex from 'vuex';
import { getEvent } from './resources/eventResource';
import { BrowserStorage } from './plugins/browserStorage/BrowserStorage';
import { browserStorageSetup } from './servicesApp/constants/browserStorageSetup';
import { isMeetingModelValid } from './servicesApp/meetingValidator/meetingValidatorService';

Vue.use(Vuex);

const currentMeetingLocalStorage = new BrowserStorage('current-meeting', browserStorageSetup);

function deleteCurrentMeetingInLocalStorage() {
  currentMeetingLocalStorage.destroy();
}

function setCurrentMeetingInLocalStorage(newValue) {
  currentMeetingLocalStorage.content = newValue;
}

// function getCurrentMeetingFromLocalStorage() {
//   return currentMeetingLocalStorage.content;
// }

const store = new Vuex.Store({
  state: {
    isFetching: false,
    currentMeeting: {
      name: '',
      expectedStartTime: '',
      expectedEndTime: '',
      realStartTime: '',
      realEndTime: '',
      goals: [],
      sideTopics: [],
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
      Object.keys(payload).forEach(key => {
        if ({}.hasOwnProperty.call(payload, key)) {
          state.currentMeeting[key] = payload[key];
        }
      });
    },
    updateRealStartTime(state, payload) {
      state.currentMeeting.realStartTime = payload;
    },
    updateRealEndTime(state, payload) {
      state.currentMeeting.realEndTime = payload;
    },
    updateIsFetching(state, payload) {
      state.isFetching = payload;
    },
  },
  actions: {
    asyncUpdateCurrentMeeting({ commit, state, dispatch }, payload) {
      if (isMeetingModelValid(payload)) {
        commit('updateCurrentMeeting', payload);
        setCurrentMeetingInLocalStorage(state.currentMeeting);
      } else {
        dispatch('asyncCleanCurrentMeeting');
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
        sideTopics: [],
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

// function initStoreWithDataFromLocalStorage() {
//   const initialCurrentMeeting = getCurrentMeetingFromLocalStorage();
//   if (initialCurrentMeeting) {
//     store.dispatch('asyncUpdateCurrentMeeting', { ...initialCurrentMeeting });
//   }
// }

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

// initStoreWithDataFromLocalStorage();
setupWatcher();

async function initStore() {
  store.commit('updateIsFetching', true);
  try {
    const response = await getEvent({ eventId: 1 });
    console.log('Response: ', response);
    const { data } = response.data;
    if (data) {
      console.log('data', data);
      store.dispatch('asyncUpdateCurrentMeeting', { ...data });
    }
  } catch (error) {
    console.log('error', error);
  }
  store.commit('updateIsFetching', false);
}

initStore();

export default store;
