import Vue from 'vue';
import Router from 'vue-router';
import Suits from '@/components/Suits';
import StepsSuggestions from '@/components/StepSuggestions';
import Case from '@/components/Case';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'suits',
      component: Suits,
    },
    {
      path: '/steps',
      name: 'steps',
      component: StepsSuggestions,
    },
    {
      path: '/suit/:suitId/case/:caseId',
      name: 'viewCase',
      component: Case,
    },
  ],
});
