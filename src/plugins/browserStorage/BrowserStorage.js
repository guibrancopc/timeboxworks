export class BrowserStorage {
  constructor(key, config) {
    this._setConfigWhenAllowed(config);
    this._setKeyWhenValid(key);
  }

  _setConfigWhenAllowed(config) {
    const _config = this.config || config;
    this.prefix = _config?.prefix;
    this.validKeys = _config?.validKeys;
  }

  _setKeyWhenValid(key) {
    if (!this.validKeys || this._isValidKey(key)) {
      this._key = this.prefix ? `${this.prefix}-${key}` : key;
    } else {
      console.error(`Wrong key received in BrowserStorage constructor: ${key} | type: ${typeof key}.`);
    }
  }

  _isValidKey(key) {
    return !!this.validKeys.find(validKey => validKey === key);
  }

  get content() {
    return JSON.parse(localStorage.getItem(this._key));
  }

  set content(value) {
    localStorage.setItem(this._key, JSON.stringify(value));
  }

  getProp(propKey) {
    if (validateObject(this.content)) {
      return this.content[propKey];
    }
    return null;
  }

  setProp(propKey, newValue) {
    const { content } = this;
    if (validateObject(content)) {
      const validContent = { ...content };
      validContent[propKey] = newValue;
      this.content = validContent;
    }
  }

  setProps(newModel) {
    const { content } = this;
    if (validateObject(content)) {
      const validContent = { ...content };
      Object.keys(content).forEach(propKey => {
        validContent[propKey] = newModel[propKey];
      });
      this.content = validContent;
    }
  }

  destroy() {
    localStorage.removeItem(this._key);
  }
}

function validateObject(content) {
  if (typeof content === 'object') {
    return true;
  }
  console.error('Browser Storage cannot manipulate property of non object content.');
  return false;
}
