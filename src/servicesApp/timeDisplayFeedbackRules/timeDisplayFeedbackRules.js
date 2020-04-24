const ONE_MINUTE = 60 * 1000;

const FIVE_MINUTES = 5 * ONE_MINUTE;

export function getTimeDisplayFeedbackByDiff(diff) {
  if (diff < FIVE_MINUTES * -1) {
    return {
      momentMessage: 'Very late by',
      durationMessage: 'Wasted time',
      theme: 'danger',
    };
  }

  if (diff < ONE_MINUTE * -1) {
    return {
      momentMessage: 'A little late by',
      durationMessage: 'Wasted time',
      theme: 'warning',
    };
  }

  if (diff < ONE_MINUTE) {
    return {
      momentMessage: 'On target',
      durationMessage: 'Well done ',
      theme: 'success',
    };
  }

  return {
    momentMessage: 'Advanced by',
    durationMessage: 'Saved time',
    theme: 'success',
  };
}
