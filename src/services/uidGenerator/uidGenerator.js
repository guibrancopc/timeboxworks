let uidIndex = 0;

const getUid = () => {
  uidIndex += 1;
  return uidIndex;
};

export default { getUid };
