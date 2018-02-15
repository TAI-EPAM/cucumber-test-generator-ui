<template>
  <div class="project-menu">
    <div class="project-menu-filter"></div>
    <div class="uui-side-bar">
      <ul class="sidebar-menu">
        <ProjectMenuSuitItem v-for="suit in localItems" :suit="suit" :selectedObject="selectedObject" />
      </ul>
      <div style="color: white; text-align: center; margin: 10px 0">{{ selectedObject }}</div>
      <epam-button @click="addSuit">Open Add Suit Modal</epam-button>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import EpamButton from '../EpamButton';
  import SuitAdd from '../../suit/SuitAdd';
  import ProjectMenuSuitItem from './ProjectMenuSuitItem';

  export default {
/*
    beforeRouteEnter(to, from, next) {
      next((vm) => {
        console.warn('beforeRouteEnter');
        vm.getSuitsItems();
      });
    },
   beforeRouteUpdate(to, from, next) {
    console.warn('beforeRouteUpdate');
    next();
   },

*/
    components: {
      EpamButton,
      ProjectMenuSuitItem,
      SuitAdd,
    },
    computed: {
      ...mapGetters(
        {
          items: 'getActiveSuits',
          getSuit: 'getActiveSuitById',
          activeProject: 'getActiveProject',
        },
      ),
    },
    data() {
      return {
        localItems: [],
        filters: null,
        selectedObject: {
          suits: [],
          cases: [],
        },
      };
    },
    methods: {
      sortByKey(array, key, reverse = false) {
        const arr = [...array];
        arr.sort((a, b) => {
          const x = a[key]; const y = b[key];
          let answer = null;
          if (x < y) {
            answer = -1;
          } else {
            answer = (x > y) ? 1 : 0;
          }
          return answer;
        });
        if (reverse) {
          arr.reverse();
        }
        return arr;
      },
      getMenuItems() {
        this.localItems = this.sortByKey(this.items, 'priority', true);
      },
      addSuit() {
        this.$vuedals.open({
          title: 'Add new Suit',
          component: SuitAdd,
          props: {
            onCancel() {
              this.$vuedals.close();
            },
            onSubmit() {
              this.$vuedals.close();
            },
          },
        });
      },
    },
    mounted() {
      this.getMenuItems();
    },
    name: 'ProjectMenu',
    watch: {
      items() {
        this.getMenuItems();
      },
    },
  };
</script>

<style scoped>
.uui-side-bar {
  display: block;
  width: 340px;
}
</style>
