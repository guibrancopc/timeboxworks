import {
  getNowISOString, getISOStringOf, getTimestampOf,
} from '../../services/timeService/timeService';

export default {
  install(Vue) {
    Vue.prototype.$TwTime = {
      getISOStringOf,
      getNowISOString,
      getTimestampOf,
    };
  },
};
