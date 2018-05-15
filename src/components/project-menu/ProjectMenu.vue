<template>
  <div class="project-menu">
    <project-menu-filters v-bind="{applyFilters, resetFilters, selectAll, resetSearch}"
                          v-model="modificators"
                          :check="selectedObject.checkAll"></project-menu-filters>
    <div class="uui-side-bar">
      <ul class="sidebar-menu">
        <ProjectMenuSuitItem
          v-bind="{selectSuit, selectCase}"
          v-for="suit in localItems"
          :suit="suit"
          :selectedObject="selectedObject"
          :key="suit.id"/>
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
  /* eslint-disable prefer-const */
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
          checkAll: false,
          suits: new Set(),
          cases: new Set(),
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
      checkIfAllSelected() {
        let result = true;
        const suits = this.selectedObject.suits;
        const cases = this.selectedObject.cases;
        this.localItems.forEach((suit) => {
          if (suits.has(suit.id)) {
            suit.cases.forEach((c) => {
              if (!cases.has(c.id)) {
                result = false;
              }
            });
          } else {
            result = false;
          }
        });
        if (result) {
          this.selectedObject.checkAll = true;
        } else {
          this.selectedObject.checkAll = false;
        }
      },
      selectAll() {
        const suits = new Set();
        const cases = new Set();
        this.selectedObject.checkAll = !this.selectedObject.checkAll;
        if (this.selectedObject.checkAll) {
          this.localItems.forEach((item) => {
            suits.add(item.id);
            item.cases.forEach((c) => {
              cases.add(c.id);
            });
          });
        }
        this.selectedObject.cases = cases;
        this.selectedObject.suits = suits;
      },
      selectSuit(suitId) {
        let suits = new Set(this.selectedObject.suits);
        let cases = new Set(this.selectedObject.cases);
        if (suits.has(suitId)) {
          this.localItems.forEach((item) => {
            if (suitId === item.id) {
              item.cases.forEach((c) => {
                cases.delete(c.id);
              });
            }
          });
          suits.delete(suitId);
        } else {
          suits.add(suitId);
          this.localItems.forEach((item) => {
            if (suitId === item.id) {
              item.cases.forEach((c) => {
                cases.add(c.id);
              });
            }
          });
        }
        this.selectedObject.suits = suits;
        this.selectedObject.cases = cases;
        this.checkIfAllSelected();
      },
      selectCase(suitId, caseId) {
        let suits = new Set(this.selectedObject.suits);
        let cases = new Set(this.selectedObject.cases);
        if (cases.has(caseId)) {
          cases.delete(caseId);
          suits.delete(suitId);
        } else {
          cases.add(caseId);
          let checkSuit = true;
          this.localItems.forEach((item) => {
            if (item.id === suitId) {
              item.cases.forEach((c) => {
                if (!cases.has(c.id)) {
                  checkSuit = false;
                }
              });
            }
          });
          if (checkSuit) {
            suits.add(suitId);
          }
        }
        this.selectedObject.suits = suits;
        this.selectedObject.cases = cases;
        this.checkIfAllSelected();
      },
      resetSearch() {
        this.modificators.filters.searchString = null;
        this.localItems = ProjectMenuController
          .setExactFilters(this.modificators.filters)
          .resetItems()
          .sortItems()
          .getSortedItems();
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
      if (this.items) {
        ProjectMenuController.setItems(this.items);
        this.getMenuItems();
      }
    },
    name: 'ProjectMenu',
    watch: {
      items: {
        handler(n) {
          ProjectMenuController.setItems(n);
          this.getMenuItems();
          this.selectedObject.checkAll = false;
          this.selectedObject.suits = new Set();
          this.selectedObject.cases = new Set();
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

  .sidebar-menu {

  }
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
