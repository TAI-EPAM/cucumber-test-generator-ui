<template>
  <div class="project-menu">
    <project-menu-filters v-bind="{applyFilters, resetFilters}" v-model="modificators"></project-menu-filters>
    <div class="uui-side-bar">
      <ul class="sidebar-menu">
        <ProjectMenuSuitItem v-for="suit in localItems" :suit="suit" :selectedObject="selectedObject" :key="suit.id"/>
      </ul>
      <div class="add-suit">
        <epam-button @click="addSuit" markup="lime-green">+ Add New Suit</epam-button>
      </div>

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
        modificators: {
          exactFiltersMode: 'suit',
          exactFilters: {
            creationDate: null,
            status: null,
            priority: null,
          },
          filters: {
            sortField: 'id',
            isReverse: false,
            searchString: null,
          },
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
                            .setFilters(this.modificators.filters)
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
      applyFilters() {
        // console.warn(modificators);
        this.localItems = ProjectMenuController
          .setExactFilters(this.modificators.exactFilters, this.modificators.exactFiltersMode)
          .searchByExactFilters()
          // .searchByName()
          .sortItems()
          .getSortedItems();
      },
      resetFilters() {
        const clearModel = {
          date: null,
          status: null,
          priority: null,
        };
        Object.assign(this.modificators.exactFilters, clearModel);
        this.localItems = ProjectMenuController
          .setExactFilters(this.modificators.exactFilters)
          .resetItems()
          .sortItems()
          .getSortedItems();
      },
    },
    mounted() {
      ProjectMenuController.setItems(this.items);
      this.getMenuItems();
    },
    name: 'ProjectMenu',
    updated() {
    },
    watch: {
      items: {
        handler(n) {
          ProjectMenuController.setItems(n);
          this.getMenuItems();
        },
        deep: true,
      },
      modificators: {
        handler() {
          this.getMenuItems();
        },
        deep: true,
      },
    },
  };
</script>

<style lang="less" scoped>
aside .uui-side-bar {
  display: block;
  width: 340px;
  background: #373838;
  top: auto;

  & ul {
   margin-bottom: 10px;
  }

  & .add-suit {
    padding: 0 10px;
    & button {
      width: 100%;
      background: transparent;
      border: none;
      color: #a3c644;
      &:hover {
        background: #a3c644;
      }
    }
  }
}

</style>
