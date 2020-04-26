let uidIndex = 0;

export const getUid = () => {
  uidIndex += 1;
  return uidIndex;
};
