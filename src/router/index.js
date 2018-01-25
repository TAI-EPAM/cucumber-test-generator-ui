import Vue from 'vue';
import Router from 'vue-router';
import SuitsView from '@/views/SuitsView';
import CaseView from '@/views/CaseView';
import DashboardView from '@/views/DashboardView';
import StepsSuggestions from '@/components/StepSuggestions';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: DashboardView,
    },
    {
      path: '/suits/',
      name: 'suitView',
      component: SuitsView,
      meta: { requiresAuth: true },
    },
    {
      path: '/suits/:suitId',
      name: 'suitEdit',
      component: SuitsView,
      meta: { requiresAuth: true },
    },
    {
      path: '/suits/add',
      name: 'suitAdd',
      component: SuitsView,
      meta: { requiresAuth: true },
    },
    {
      path: '/steps',
      name: 'steps',
      component: StepsSuggestions,
      meta: { requiresAuth: true },
    },
    {
      path: '/suits/:suitId/case/:caseId',
      name: 'caseView',
      component: CaseView,
      meta: { requiresAuth: true },
    },
    {
      path: '/login',
      name: 'Login',
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!(Vue.ls.get('isAuth', false))) {
      next({
        path: '/login',
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
