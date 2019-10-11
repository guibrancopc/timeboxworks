import twForm from './twForm/twForm.vue';
import twButton from './twButton/twButton.vue';
import twInputText from './twInputText/twInputText.vue';
import twInputDatetimepicker from './twInputDatetimepicker/twInputDatetimepicker.vue';
import twLogo from './twLogo/twLogo.vue';
import twTitle from './twTitle/twTitle.vue';

export default (Vue) => {
  Vue.component('tw-form', twForm);
  Vue.component('tw-button', twButton);
  Vue.component('tw-input-text', twInputText);
  Vue.component('tw-input-datetimepicker', twInputDatetimepicker);
  Vue.component('tw-logo', twLogo);
  Vue.component('tw-title', twTitle);
};
