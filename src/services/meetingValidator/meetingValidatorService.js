
export function isMeetingModelValid(meeting) {
  const isValid = isStringAndRequired(meeting.name)
    && isStringAndRequired(meeting.expectedStartTime)
    && isStringAndRequired(meeting.expectedEndTime)
    && isString(meeting.description)
    && isGoalsValid(meeting.goals);

  if (isValid) { return true; }
  console.error('Meeting model is invalid! This model cannot be stored.');
  return false;
}

function isStringAndRequired(value) {
  return value && isString(value);
}

function isString(value) {
  return typeof value === 'string';
}

function isGoalValid(goal) {
  return isStringAndRequired(goal.name)
    && isStringAndRequired(goal.value);
}

function isGoalsValid(goals) {
  return Array.isArray(goals)
    && goals.every(isGoalValid);
}
