function handleDoubleReturn(event) {
  if (selectionEnabled(event.target)) { return; }
  if (event.key === 'Enter') {
    addSecondReturnWhenNeeded(event.target);
  }
  if (event.key === 'Backspace') {
    removeSecondReturnWhenNeeded(event.target);
  }
}

function selectionEnabled(el) {
  return el.selectionStart !== el.selectionEnd;
}

function addSecondReturnWhenNeeded(el) {
  if (isReturnInEvenQuantity(el.value)) {
    const { selectionEnd } = el;
    el.value = `${el.value.substring(0, selectionEnd)}\n${el.value.substring(selectionEnd, el.value.length)}`;
    el.selectionEnd = selectionEnd + 1;
  }
}

function removeSecondReturnWhenNeeded(el) {
  if (isReturnInEvenQuantity(el.value) && selectionEndIsReturn(el)) {
    const { selectionEnd } = el;
    el.value = `${el.value.substring(0, el.selectionEnd - 1)}${el.value.substring(el.selectionEnd, el.value.length)}`;
    el.selectionEnd = selectionEnd - 1;
  }
}

function isReturnInEvenQuantity(value) {
  return !((countLastReturnCharactersSequence(value) || 0) % 2);
}

function selectionEndIsReturn(el) {
  return el?.value && getReturnOccurrencies(el.value[el.selectionEnd - 1] || '');
}

function getReturnOccurrencies(str) {
  return str?.match(/[\n\r]/g)?.length;
}

function countLastReturnCharactersSequence(str) {
  let counter = 0;
  for (let i = str.length; i >= 0; i -= 1) {
    if (counter > 0 && !getReturnOccurrencies(str[i])) {
      return counter;
    }
    if (getReturnOccurrencies(str[i])) {
      counter += 1;
    }
  }
  return counter;
}

export default {
  bind: (el, binding) => {
    if (binding.value?.disabled) { return; }
    el.addEventListener('keydown', handleDoubleReturn);
  },
  unbind: (el, binding) => {
    if (binding.value?.disabled) { return; }
    el.removeEventListener('keydown', handleDoubleReturn);
  },
};
