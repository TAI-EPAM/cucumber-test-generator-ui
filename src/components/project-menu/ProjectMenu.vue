<template>
  <div class="project-menu">
    <project-menu-filters v-model="filters"></project-menu-filters>
    <div class="uui-side-bar">
      <ul class="sidebar-menu">
        <ProjectMenuSuitItem v-for="suit in localItems" :suit="suit" :selectedObject="selectedObject" :key="suit.id"/>
      </ul>
      <div style="text-align: center"><epam-button @click="addSuit">Open Add Suit Modal</epam-button></div>
      <div style="color: white; text-align: center; margin: 10px 0" v-if="$route.query.debug">
        {{ filterController }}
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import EpamButton from '../ui/EpamButton';
  import SuitAdd from '../suit/SuitAdd';
  import ProjectMenuSuitItem from './ProjectMenuSuitItem';
  import ProjectMenuFilters from './ProjectMenuFilters';
  import ProjectMenuClass from './ProjectMenu.class';


  const ProjectMenuController = new ProjectMenuClass();

  export default {
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
          sortField: 'id',
          isReverse: false,
          searchString: null,
        },
        selectedObject: {
          suits: [],
          cases: [],
        },
      };
    },
    methods: {
      getMenuItems() {
        this.localItems = ProjectMenuController
                            .setFilters(this.filters)
                            .searchByName()
                            .sortItems()
                            .getSortedItems();
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
      ProjectMenuController.setItems(this.items);
      console.warn(ProjectMenuController);
      this.getMenuItems();
    },
    name: 'ProjectMenu',
    updated() {
    },
    watch: {
      items(n) {
        ProjectMenuController.setItems(n);
        this.getMenuItems();
      },
      filters: {
        handler() {
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
