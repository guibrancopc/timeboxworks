import BrowserStoragePlugin from './browserStoragePlugin';

export const BrowserStorage = (Vue, options) => {
  Vue.use(BrowserStoragePlugin, options);
};
