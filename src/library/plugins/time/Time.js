import {
  isDuration, durationFactory, momentFactory, getNowISOString,
} from '../../services/timeService/timeService';

export class Time {
  constructor(value, { duration = false } = {}) {
    if (isDuration(value) || duration) {
      this._duration = durationFactory(value);
    } else {
      this._moment = momentFactory(value);
    }
  }

  get duration() {
    return this._duration;
  }

  get moment() {
    return this._moment;
  }

  static getNowISOString() {
    return getNowISOString();
  }
}
