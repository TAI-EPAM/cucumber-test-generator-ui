<template>
  <div class="project-menu-filter" :class="{ extend: isExtend }">
    <ul class="filter-nav">
      <li><span @click="showPanel('search')">Search</span></li>
      <li><span @click="showPanel('filter')">Filter</span></li>
      <li>
        <label>SortBy:</label>
        <select v-model="entity.filters.sortField">
          <option value="creationDate">Date Creation</option>
          <option value="name">Name</option>
          <option value="priority">Priority</option>
        </select>
        <input type="checkbox" v-model="entity.filters.isReverse" />
      </li>
    </ul>
    <div class="search-panel" v-show="panels.search">
      Search by name: <input type="text" v-model="entity.filters.searchString" />
    </div>
    <div class="filter-panel" v-show="panels.filter">
      <div class="entityTypes-holder">
        <label><input type="radio" value="suit" v-model="entity.exactFiltersMode" :checked="entity.exactFiltersMode === value"/> Suit</label>
        <label><input type="radio" value="case" v-model="entity.exactFiltersMode" :checked="entity.exactFiltersMode === value"/> Case</label>
      </div>
      <label>
        <span>Status:</span>
        <select v-model="entity.exactFilters.status">
          <option v-for="(item, i) in statuses" :value="item[0]">
            {{item[1].title}}
          </option>
        </select>
      </label>
      <label>
        <span>Priority:</span>
        <select v-model="entity.exactFilters.priority">
          <option v-for="(item, i) in priorities" :value="item[0]">
            {{item[1].title}}
          </option>
        </select>
      </label>
      <epam-button @click="resetFilters()" :markup="'small'">Reset Filters</epam-button>
      <epam-button @click="applyFilters(entity)" :markup="'small'">Apply Filters</epam-button>
    </div>
  </div>
</template>

<script>
  import PriorityMap from '@/constants/Priority';
  import StatusMap from '@/constants/Status';
  import EpamButton from '../ui/EpamButton';

  export default {
    components: {
      EpamButton,
    },
    computed: {
    },
    data() {
      return {
        entity: Object.assign({}, this.value),
        panels: {
          search: false,
          filter: false,
        },
        priorities: Array.from(PriorityMap).reverse(),
        statuses: Array.from(StatusMap),
        isExtend: false,
      };
    },
    methods: {
      showPanel(p) {
        Object.keys(this.panels).forEach((key) => {
          this.panels[key] = false;
        });
        this.panels[p] = true;
        this.isExtend = true;
      },
    },
    mounted() {
      // console.warn(this.value);
    },
    name: 'ProjectMenuFilters',
    props: ['value', 'applyFilters', 'resetFilters'],
    watch: {
      entity: {
        handler() {
          if (this.entity.filters.searchString) {
            this.entity.filters.searchString = this.entity.filters.searchString.trim().toLowerCase();
          }
          this.$emit('input', this.entity);
        },
        deep: true,
      },
    },
  };
</script>

<style scoped lang="less">
.project-menu-filter {
  color: white;
  height: 60px;
  font-size: 11px;

  &.extend {
    height: 170px;
  }

  & .search-panel {
  }
  & .filter-panel {
    & label {
      display: block;
      margin: 0 0 10px 0;
      & > span {
        width: 100px;
        display: inline-block;
      }
    }
    & .entityTypes-holder {
      & label {
        display: inline-block;
      }
    }

  }

  & > .filter-nav {
    width: 340px;
    overflow: hidden;
    & li {
      display: inline-block;
      width: 60px;
      & > span {
        display: block;
        width: 60px; height: 60px;
        line-height: 60px;
      }

      &:last-child {
        width: 210px;
      }
    }
  }

}
</style>
