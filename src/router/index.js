import Vue from 'vue';
import Router from 'vue-router';
import SuitsView from '@/views/SuitsView';
import CaseView from '@/views/CaseView';
import DashboardView from '@/views/DashboardView';
import StepsSuggestions from '@/components/suggestion/StepSuggestions';
import ProjectView from '@/views/ProjectView';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: DashboardView,
      meta: { requiresAuth: true },
    },
    {
      path: '/projects/:projectId',
      name: 'Project',
      component: ProjectView,
      meta: { requiresAuth: true },
    },
    {
      path: '/projects/:projectId/suits/:suitId',
      name: 'suitView',
      component: SuitsView,
      meta: { requiresAuth: true },
    },
    {
      path: '/projects/:projectId/suits/:suitId/case/:caseId',
      name: 'caseView',
      component: CaseView,
      meta: { requiresAuth: true },
    },
    {
      path: '/steps',
      name: 'steps',
      component: StepsSuggestions,
      meta: { requiresAuth: true },
    },
    {
      path: '/login',
      name: 'Login',
    },
    {
      path: '/registration',
      name: 'Registration',
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
