export function cleanDOM(el) {
  el.remove();
}

export function isTargetElementOfEvent(e) {
  return e.eventPhase === 2;
}

function getAppElements() {
  const exceptionClass = '.tw-modal';
  return document.querySelectorAll(`body > :not(${exceptionClass})`);
}

function shouldShowBlurBackground(shouldShow) {
  const appElements = getAppElements();
  if (!appElements) { return; }
  appElements.forEach(appElement => {
    appElement
      .classList[shouldShow ? 'add' : 'remove']('tw-u-filter-blur--5px');
  });
}

export function addBlurBackground() {
  shouldShowBlurBackground(true);
}

export function removeBlurBackgroundWhenIsLastModal() {
  const totalModalsOpened = document.querySelectorAll('.tw-modal').length;
  if (totalModalsOpened <= 1) {
    shouldShowBlurBackground(false);
  }
}

export function removeBodyScrollbar() {
  document.body.classList.add('tw-u-overflow-y--hidden');
}

export function addBodyScrollbar() {
  document.body.classList.remove('tw-u-overflow-y--hidden');
}

export function addKeyupListener(callback) {
  document.addEventListener('keyup', callback);
}

export function removeKeyupListener(callback) {
  document.removeEventListener('keyup', callback);
}
