export const validValues = validValuesList => ({
  validator(value) {
    if (value && validValuesList && !validValuesList.includes(value)) {
      return false;
    }
    return true;
  },
});
