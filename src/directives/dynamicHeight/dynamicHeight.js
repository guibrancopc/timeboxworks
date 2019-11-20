const setOverflowHidden = (el) => {
  el.style.overflow = 'hidden';
};

const setMinHeghtIfRequested = (el, binding) => {
  if (binding.value && binding.value.minHeight) {
    el.style['min-height'] = binding.value.minHeight;
  }
};

const updateElementHeight = (options) => {
  options.target.style.height = 0;
  options.target.style.height = `${options.target.scrollHeight}px`;
};

export default {
  bind: (el, binding) => {
    if (binding.value && binding.value.disabled) { return; }
    setOverflowHidden(el);
    setMinHeghtIfRequested(el, binding);
    el.addEventListener('input', updateElementHeight);
  },
  unbind: (el, binding) => {
    if (binding.value && binding.value.disabled) { return; }
    el.removeEventListener('input', updateElementHeight);
  },
};
