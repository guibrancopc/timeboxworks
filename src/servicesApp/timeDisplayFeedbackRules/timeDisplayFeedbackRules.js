const ONE_MINUTE = 60 * 1000;

const FIVE_MINUTES = 5 * ONE_MINUTE;

export function getTimeDisplayFeedbackByDiff(diff) {
  if (typeof diff !== 'number') {
    console.error(`Wrong diff type received in timeDisplayFeedbackRules. Expected "number", got "${typeof diff}".`);
    return {
      momentMessage: '',
      durationMessage: '',
      theme: 'secondary',
    };
  }

  if (diff < FIVE_MINUTES * -1) {
    return {
      momentMessage: 'Very late by',
      durationMessage: 'Wasted',
      theme: 'danger',
    };
  }

  if (diff < ONE_MINUTE * -1) {
    return {
      momentMessage: 'Late by',
      durationMessage: 'Wasted',
      theme: 'warning',
    };
  }

  if (diff < 0) {
    return {
      momentMessage: 'A little late by',
      durationMessage: 'Wasted',
      theme: 'warning',
    };
  }

  if (diff < ONE_MINUTE) {
    return {
      momentMessage: 'On target! Left just',
      durationMessage: 'On target! Left just',
      theme: 'success',
    };
  }

  return {
    momentMessage: 'Advanced by',
    durationMessage: 'Saved',
    theme: 'success',
  };
}
