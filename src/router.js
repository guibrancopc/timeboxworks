import Vue from 'vue';
import Router from 'vue-router';
import MeetingForm from './pages/meetingForm/meetingForm.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: { name: 'meetingForm' },
    },
    {
      path: '/meeting/form',
      name: 'meetingForm',
      component: MeetingForm,
    },
    {
      path: '/meeting/dashboard',
      name: 'meetingDashboard',
      component: () => import(/* webpackChunkName: "meetingDashboard" */ './pages/meetingDashboard/meetingDashboard.vue'),
    },
    {
      path: '/meeting/report',
      name: 'meetingReport',
      component: () => import(/* webpackChunkName: "meetingReport" */ './pages/meetingReport/meetingReport.vue'),
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { x: 0, y: 0 };
  },
});
