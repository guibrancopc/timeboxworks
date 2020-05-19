export function copyHtmlToClipboardByElement(element) {
  window.getSelection().removeAllRanges();
  const range = document.createRange();
  range.selectNode(getElement(element) || {});
  window.getSelection().addRange(range);
  document.execCommand('copy');

  copySelectionWithAllStylesheetsDisabled();

  window.getSelection().removeAllRanges();
}

function getElement(value) {
  if (isElement(value)) { return value; }
  return document.querySelector(value);
}

function isElement(value) {
  return value instanceof Element || value instanceof HTMLDocument;
}

function copySelectionWithAllStylesheetsDisabled() {
  const activeSheets = Array.prototype.slice.call(document.styleSheets)
    .filter(sheet => !sheet.disabled);

  activeSheets.forEach(activeSheet => {
    activeSheet.disabled = true;
  });

  document.execCommand('copy');

  activeSheets.forEach(activeSheet => {
    activeSheet.disabled = false;
  });
}
