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
      redirect: {
        name: 'suits',
        params: { mode: 'add' },
      },
    },
    {
      path: '/suits/:mode',
      name: 'suits',
      component: Suits,
    },
    {
      path: '/steps',
      name: 'steps',
      component: StepsSuggestions,
    },
    {
      path: '/suits/:suitId/case/:caseId',
      name: 'viewCase',
      component: Case,
    },
  ],
});
