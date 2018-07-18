<template>
  <div class="project-menu-filter" :class="{ extendSearch: panels.search, extendFilter: panels.filter }">
    <ul class="filter-nav">
      <li v-if="!this.$store.state.startTestRun">
        <check-box @click="selectAll" :check="check"></check-box>
      </li>
      <li :class="{'active': panels.search}">
        <a @click="showPanel('search')">
          <svgicon name="binocle" class="binoculars"></svgicon>
        </a>
      </li>
      <li :class="{'active': panels.filter}">
        <a @click="showPanel('filter')">
          <svgicon name="filter" class="filter"></svgicon>
        </a>
      <li>
        <label>SortBy:</label>
        <select v-model="entity.filters.sortField">
          <option value="creationDate">Creation Date</option>
          <option value="name">Name</option>
          <option value="priority">Priority</option>
        </select>
        <!--<check-box @click="clickCheckBox"></check-box>-->
      </li>
    </ul>
    <div class="search-panel" v-show="panels.search">
      <input type="text" v-model="entity.filters.searchString" placeholder="Search Suits or Cases Here"/>
      <span @click="toggleShowPanel('search')" class="fa fa-lg fa-times closeIcon"></span>
      <a @click="resetSearch()">
        <svgicon name="cross" class="clear-search"></svgicon>
      </a>
    </div>
    <div class="filter-panel" v-show="panels.filter">
      <span @click="toggleShowPanel('filter')" class="fa fa-lg fa-times closeIcon closeFilter"></span>
      <div class="entityTypes-holder">
        <radio-button
          radioId="radio1"
          value="suit"
          label="Suit Filter"
          group="radioGroup"
          :check="entity.exactFiltersMode"
          @click="radioButtonChange"></radio-button>
        <radio-button
          radioId="radio2"
          value="case"
          label="Case Filter"
          group="radioGroup"
          :check="entity.exactFiltersMode"
          @click="radioButtonChange"></radio-button>
      </div>
      <div class="filters-content">
        <label>
          <span>Status</span>
          <select v-model="entity.exactFilters.status">
            <option v-for="(item, i) in statuses" :value="item[0]">
              {{item[1].title}}
            </option>
          </select>
        </label>
        <label>
          <span>Priority</span>
          <select v-model="entity.exactFilters.priority">
            <option v-for="(item, i) in priorities" :value="item[0]">
              {{item[1].title}}
            </option>
          </select>
        </label>
        <label>
          <span>Creation Date</span>
          <date-picker v-model="entity.exactFilters.creationDate"></date-picker>
        </label>
      </div>
      <div class="filters-buttons">
        <epam-button @click="resetFilters()" :markup="'small'">Refresh Filters</epam-button>
        <epam-button class="uui-button blue" @click="applyFilters(entity)">Apply Filters</epam-button>
      </div>
    </div>
  </div>
</template>

<script>
  import PriorityMap from '@/constants/Priority';
  import StatusMap from '@/constants/Status';
  import EpamButton from '../ui/EpamButton';
  import DatePicker from '../../components/ui/DatePicker';
  import CheckBox from '../../components/ui/Checkbox';
  import RadioButton from '../../components/ui/RadioButton';
  import '../../assets/converted/binocle';
  import '../../assets/converted/filter';
  import '../../assets/converted/cross';

  export default {
    components: {
      EpamButton,
      PriorityMap,
      StatusMap,
      DatePicker,
      CheckBox,
      RadioButton,
    },
    computed: {},
    data() {
      return {
        time: new Date(),
        entity: Object.assign({ }, this.value),
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
      clickCheckBox() {
        this.entity.filters.isReverse = !this.entity.filters.isReverse;
      },
      toggleShowPanel(p) {
        this.panels[p] = false;
        this.isExtend = false;
      },
      radioButtonChange(e, r) {
        this.entity.exactFiltersMode = r;
      },
    },
    mounted() {
      // console.warn(this.value);
    },
    name: 'ProjectMenuFilters',
    props: ['value', 'applyFilters', 'resetFilters', 'selectAll', 'check', 'resetSearch'],
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

<style scoped>
  @import "../../assets/css/vue-datepicker-local.css";
</style>
<style lang="less">
  @import "../../assets/vendors/epam-ui/less/uui-colors";
  @import "../../assets/vendors/epam-ui/less/uui-form-elements";
  @import "../../assets/vendors/epam-ui/less/uui-fonts";

  .project-menu-filter {
    color: white;
    height: 60px;
    font-size: 11px;
    border-bottom: 1px solid @almost_black;

    .closeIcon{
      font-size: 24px;
      margin-left: 15px;
      cursor: pointer;
      color: #979797;
      display: inline-block;
    }

    &.extendSearch {
      height: 120px;
    }

    &.extendFilter {
      height: 340px;
    }

    & .search-panel {
      height: 60px;
      background-color: @almost_black;
      padding-left: 38px;
      padding-top: 14px;
      position: relative;
      input[type='text'] {
        height: 32px;
        width: 236px;
        font-style: italic;
        font-size: 14px;
        padding-left: 10px;
        background-color: @nearly_black;
        color: @gray;
        border: none;
      }
      a {
        position: absolute;
        right: 73px;
        top: 23px;
        .clear-search {
          fill: @gray;
          width: 14px;
          height: 14px;
          cursor: pointer;
        }
      }
    }
    & .filter-panel {
      background-color: @almost_black;
      height: 100%;
      padding-left: 22px;
      padding-right: 41px;
      padding-top: 31px;
      position: relative;
      .closeFilter {
        position: absolute;
        right: 20px;
        top: 20px;
      }
      & label {
        display: block;
        color: #C9C9C9;
        font-size: 14px;
        margin-right: 43px;
        & > span {
          width: 100px;
          display: inline-block;
        }
      }
      & .entityTypes-holder {
        margin-bottom: 25px;
        & label {
          display: inline-block;
        }
      }
      .filters-content {
        margin-bottom: 25px;
        label:nth-of-type(2) {
          margin: 8px 0;
        }
        label {
          display: flex;
          justify-content: space-between;
          margin-right: 0;
          align-items: center;
        }
        select {
          width: 198px;
          height: 32px;
          background-color: #373838;
          border: none;
          color: #C9C9C9;
        }
        .datepicker {
          width: 198px;
          input {
            border: none;
            color: #C9C9C9;
            font-family: @Source_Sans_Pro_Light;
            background-color: #373838;
          }
        }
      }
      .filters-buttons {
        text-align: right;
        button:first-of-type {
          background-color: transparent;
          color: @blue;
          text-transform: capitalize;
          font-size: 13px;
          border: none;
          font-family: @Source_Sans_Pro_Light;
        }
      }
    }

    & > .filter-nav {
      width: 340px;
      overflow: hidden;
      display: flex;
      & li {
        display: inline-block;
        width: 60px;
        border-right: 1px solid @almost_black;
        height: 60px;
        padding-top: 20px;
        padding-left: 20px;
        border-bottom: 1px solid @almost_black;
        a {
          cursor: pointer;
        }

        & > span {
          display: block;
        }
        &:last-child {
          width: 180px;
          border-right: none;
          padding-right: 10px;
          display: flex;
          align-items: baseline;
          justify-content: flex-end;
          select {
            background-color: @nearly_black;
            border: none;
            color: @blue;
            border-bottom: 1px dashed @blue;
            cursor: pointer;
          }
        }
        .filter {
          width: 20px;
          height: 20px;
          fill: @gray;
        }
        .binoculars {
          margin-top: 3px;
          margin-left: -3px;
          width: 24px;
          height: 14px;
          fill: @gray;
        }
      }
    }

    li.active {
      border-top: 4px solid @blue;
      padding-top: 16px;
      background-color: @almost_black;
      .binoculars, .filter {
        fill: @blue;
      }
    }
  }
</style>
