function setOverflowHidden(el) {
  el.style.overflow = 'hidden';
}

function setMinHeghtWhenRequested(el, binding) {
  if (binding.value && binding.value.minHeight) {
    el.style['min-height'] = binding.value.minHeight;
  }
}

function updateElementHeight(options) {
  options.target.style.height = 0;
  options.target.style.height = `${options.target.scrollHeight}px`;
}

function initElementHeight(el) {
  setTimeout(() => {
    updateElementHeight({ target: el });
  });
}

export default {
  bind: (el, binding) => {
    if (binding.value?.disabled) { return; }
    setOverflowHidden(el);
    setMinHeghtWhenRequested(el, binding);
    initElementHeight(el);
    el.addEventListener('input', updateElementHeight);
  },
  unbind: (el, binding) => {
    if (binding.value?.disabled) { return; }
    el.removeEventListener('input', updateElementHeight);
  },
};
