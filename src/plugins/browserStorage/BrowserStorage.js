export class BrowserStorage {
  constructor(key, config) {
    this.setConfigWhenAllowed(config);
    this.setKeyWhenValid(key);
  }

  setConfigWhenAllowed(config) {
    const _config = this.config || config;
    this.prefix = _config?.prefix;
    this.validKeys = _config?.validKeys;
  }

  setKeyWhenValid(key) {
    if (!this.validKeys || this.isValidKey(key)) {
      this._key = this.prefix ? `${this.prefix}-${key}` : key;
    } else {
      console.error(`Wrong key received in BrowserStorage constructor: ${key} | type: ${typeof key}.`);
    }
  }

  get content() {
    return JSON.parse(localStorage.getItem(this._key));
  }

  set content(value) {
    localStorage.setItem(this._key, JSON.stringify(value));
  }

  isValidKey(key) {
    return !!this.validKeys.find(validKey => validKey === key);
  }

  destroy() {
    localStorage.removeItem(this._key);
  }
}
