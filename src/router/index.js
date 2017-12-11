import Vue from 'vue';
import Router from 'vue-router';
import SuitsView from '@/views/SuitsView';
import CaseView from '@/views/CaseView';
import StepsSuggestions from '@/components/StepSuggestions';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'suitView',
      component: SuitsView,
    },
    {
      path: '/suits/:suitId',
      name: 'suitEdit',
      component: SuitsView,
    },
    {
      path: '/suits/add',
      name: 'suitAdd',
      component: SuitsView,
    },
    {
      path: '/steps',
      name: 'steps',
      component: StepsSuggestions,
    },
    {
      path: '/suits/:suitId/case/:caseId',
      name: 'caseView',
      component: CaseView,
    },
  ],
});
