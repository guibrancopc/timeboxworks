import twForm from './twForm/twForm.vue';
import twButton from './twButton/twButton.vue';
import twInputText from './twInputText/twInputText.vue';

export default (Vue) => {
  Vue.component('tw-form', twForm);
  Vue.component('tw-button', twButton);
  Vue.component('tw-input-text', twInputText);
};
