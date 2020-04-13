import Moment from 'moment';

export default class Time {
  constructor(timeString) {
    this.time = timeString;
  }

  get time() {
    return this._time;
  }

  set time(timeString) {
    if (timeString === 'now') {
      this._time = new Moment();
    } else if (timeString) {
      this._time = new Moment(timeString);
    } else {
      console.error(`Wrong value received in Time class constructor. Value received: ${timeString}; Type: ${typeof timeString}.`);
      this._time = new Moment(0);
    }
  }

  timestamp() {
    return this.time.valueOf();
  }

  format(definition) {
    return this.time.format(definition);
  }

  humanize() {
    return this.time.format('dddd, MMMM Do YYYY, HH:mm a');
  }

  toISOString() {
    return Moment(this.time).toISOString(true);
  }

  diffFromNow() {
    return Moment(this.diffFromNowTimestamp()).utc();
  }

  diffFromNowTimestamp() {
    const { time } = this;
    const now = this.constructor._getNow();
    return this.isAheadFromNow() ? time.diff(now) : now.diff(time);
  }

  isAheadFromNow() {
    const { time } = this;
    const now = this.constructor._getNow();
    return time.unix() > now.unix();
  }

  static _getNow() {
    return new Moment();
  }

  static getNowISOString() {
    return Moment().toISOString(true);
  }

  static convertToISOString(value) {
    return Moment(value).toISOString(true);
  }

  static formatString(time, format) {
    return Moment(time).format(format);
  }
}
