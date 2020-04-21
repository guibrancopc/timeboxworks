import Moment from 'moment';

export function momentFactory(timeValue) {
  if (Moment.isMoment(timeValue)) {
    return timeValue;
  }
  if (timeValue === 'now') {
    return new Moment();
  }
  if (timeValue) {
    return new Moment(timeValue);
  }
  console.error(`Wrong value received in Time Service. Value received: ${timeValue}; Type: ${typeof timeValue}.`);
  return new Moment(0);
}

export function getFormattedTime(time, theFormat) {
  return momentFactory(time).format(theFormat);
}

export function getTimestampOf(value) {
  return momentFactory(value).valueOf();
}

export function getFullFormatOf(value) {
  return momentFactory(value).format('dddd, MMMM Do YYYY, HH:mm a');
}

export function getISOStringOf(value) {
  return momentFactory(value).toISOString(true);
}

export function getNow() {
  return momentFactory('now');
}

export function getNowISOString() {
  return getISOStringOf(momentFactory('now'));
}

export function getDiffOf(first, second) {
  const firstMoment = momentFactory(first);
  const secondMoment = momentFactory(second);
  return firstMoment.diff(secondMoment);
}

export function durationFactory(value) {
  const Duration = Moment.duration;
  return new Duration(value);
}

export function isDuration(value) {
  return Moment.isDuration(value);
}
