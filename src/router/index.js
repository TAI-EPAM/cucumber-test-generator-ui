import Vue from 'vue';
import Router from 'vue-router';
import SuitsView from '@/views/SuitsView';
import CaseView from '@/views/CaseView';
import DashboardView from '@/views/DashboardView';
import StepsSuggestions from '@/components/suggestion/StepSuggestions';
import ProjectView from '@/views/ProjectView';
import PasswordForgot from '@/components/PasswordForgot';
import Registration from '@/components/Registration';
import TestRun from '@/components/ui/TestRun';
import TestRunCase from '@/components/test run components/TestRunCase';

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
      component: Registration,
    },
    {
      path: '/passwordForgot',
      name: 'PasswordForgot',
      component: PasswordForgot,
    },
    {
      path: '/testRun/projects/:projectId/suits/:suitId/case/:caseId',
      name: 'TestRun',
      component: TestRun,
      meta: { requiresAuth: true },
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
