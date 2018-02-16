<template>
  <div class="project-menu">
    <project-menu-filters v-model="filters"></project-menu-filters>
    <div class="uui-side-bar">
      <ul class="sidebar-menu">
        <ProjectMenuSuitItem v-for="suit in localItems" :suit="suit" :selectedObject="selectedObject" :key="suit.id"/>
      </ul>
      <epam-button @click="addSuit">Open Add Suit Modal</epam-button>
      <div style="color: white; text-align: center; margin: 10px 0" v-if="$route.query.debug">{{ selectedObject }}</div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import EpamButton from '../EpamButton';
  import SuitAdd from '../../suit/SuitAdd';
  import ProjectMenuSuitItem from './ProjectMenuSuitItem';
  import ProjectMenuFilters from './ProjectMenuFilters';

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
      ProjectMenuFilters,
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
        filters: {
          sortField: null,
          reverse: false,
        },
        selectedObject: {
          suits: [],
          cases: [],
        },
      };
    },
    methods: {
      sortByKey(params) {
        const arr = [...this.items];
        const { key, reverse } = params;
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
      getFilterParams() {
        return {
          sortBy: {
            key: this.filters.sortField,
            reverse: this.filters.reverse,
          },
          searchString: null,
        };
      },
      getMenuItems() {
        // Filter point here !!!
        const params = this.getFilterParams();
        if (!params.searchString) {
          this.localItems = this.sortByKey({ ...params.sortBy });
        }
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
    updated() {
    },
    watch: {
      items() {
        this.getMenuItems();
      },
      filters: {
        handler() {
          console.warn('handler change');
          this.getMenuItems();
        },
        deep: true,
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
