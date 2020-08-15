
export function isMeetingModelValid(meeting) {
  const isValid = (
    meeting
    && isStringAndRequired(meeting, 'name')
    && isStringAndRequired(meeting, 'expectedStartTime')
    && isStringAndRequired(meeting, 'expectedEndTime')
    && isStringWhenExists(meeting, 'description')
    && isGoalsValid(meeting, 'goals')
  );

  if (isValid) { return true; }
  console.error('Meeting model is invalid! This model cannot be stored.');
  return false;
}

function isStringAndRequired(model, propName) {
  const prop = model[propName];
  return prop && isString(prop);
}

function isString(value, propName) {
  const isValid = typeof value === 'string';
  if (!isValid) {
    console.error(`Expected "string" type and got "${typeof value}" of prop "${propName || 'N/A'}"`);
  }
  return isValid;
}

function isNumber(value, propName) {
  const isValid = typeof value === 'number';
  if (!isValid) {
    console.error(`Expected "number" type and got "${typeof value}" of prop "${propName || 'N/A'}"`);
  }
  return isValid;
}

function isStringWhenExists(model, propName) {
  const value = model[propName];
  return !value || isString(value, propName);
}

function isGoalValid(goal) {
  return isStringAndRequired(goal, 'name')
    && isStringAndRequired(goal, 'id')
    && (!goal.weight || isNumber(goal.weight, 'weight'));
}

function isGoalsValid(model, propName) {
  const value = model[propName];
  const isValid = Array.isArray(value)
  && value.every(isGoalValid);
  if (!isValid) {
    console.error('Goal model is invalid.');
  }
  return isValid;
}
