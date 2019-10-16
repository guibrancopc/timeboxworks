import twHeader from './twHeader/twHeader.vue';
import twFooter from './twFooter/twFooter.vue';
import twMenu from './twMenu/twMenu.vue';

export default (Vue) => {
  Vue.component('tw-header', twHeader);
  Vue.component('tw-footer', twFooter);
  Vue.component('tw-menu', twMenu);
};
