import Vue from 'vue';
import Router from 'vue-router';
import Suits from '@/components/Suits';
import StepsSuggestions from '@/components/StepSuggestions';
import SuitAdd from '@/components/suit/SuitAdd';


Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'suits',
      component: Suits,
    },
    {
      path: '/suits/add',
      name: 'suit-add',
      component: SuitAdd,
    },
    {
      path: '/steps',
      name: 'steps',
      component: StepsSuggestions,
    },
  ],
});
