<template>
  <li class="case-item"
      :class="{ 'active': caseItem.id === activeCaseId }"
      @click="clickCase(caseItem.id)">
    <div class="checkbox-wrapper">
      <check-box class="case-checkbox" @click="selectCase(suitId, caseItem.id)" :check="selectedCheck"></check-box>
    </div>
    <router-link :to="{ name: 'caseView', params: { suitId, caseId: caseItem.id }}">
      <span class="case-name">{{caseItem.name}}</span>
      <priority-icon v-model="caseItem.priority" />
      <span class="case-item-status"
            :class="caseItem.status && caseItem.status.toLowerCase()">
        {{ caseItem.status && caseItem.status.replace(/_/, ' ') }}
      </span>
    </router-link>
  </li>
</template>

<script>
  import PriorityIcon from '../ui/PriorityIcon';
  import CheckBox from '../../components/ui/Checkbox';

  export default {
    components: {
      PriorityIcon,
      CheckBox,
    },
    computed: {
      selectedCheck() {
        this.selected = this.selectedObject.cases.has(this.caseItem.id);
        return this.selected;
      },
    },
    data() {
      return {
        selected: false,
      };
    },
    methods: {
    },
    props: ['caseItem', 'selectedObject', 'suitId', 'selectCase', 'clickCase', 'activeCaseId'],
    name: 'ProjectMenuCaseItem',
    watch: {
      selected(newValue) {
        if (newValue) {
          this.selectedObject.cases.has(this.caseItem.id);
        } else {
          this.selectedObject.cases.delete(this.caseItem.id);
        }
      },
    },
  };
</script>

<style lang="less">
  @import "../../assets/vendors/epam-ui/less/uui-fonts";
  @import "../../assets/vendors/epam-ui/less/uui-colors";

  .case-item {
    display: flex;
    padding-left: 66px;
    padding-right: 32px;
    position: relative;
    background-color: #2B2B2B;
  }

  .case-item.active {
    background-color: #202020;
    border-left: 3px solid @blue;
    padding-left: 63px;
  }

   aside .uui-side-bar ul > li.sub-menu .sub > li.case-item {

     & > a {
       width: 220px;
       line-height: 50px;
       margin: 0;
       padding: 0;
       margin-left: 26px;

       //display: inline-block;

       & > i {
         //line-height: 50px;
         margin-left: 5px;
       }

       & > span {
         font-size: 14px;
         //line-height: 24px;
       }
     }

     & .checkbox-wrapper {
       display: inline-block;
       position: absolute;
       top: 15px;
       //line-height: 30px;
     }

     .case-item-status {
       font-size: 10px;
       display: inline-block;
       float: right;
       font-family: @Oswald_Regular;
       color: @gray;
       min-width: 20px;
       padding-top: 15px;
       float: right;
     }
   }

  aside .uui-side-bar ul > li.sub-menu .sub > li.case-item,
  aside .uui-side-bar ul > li.sub-menu .sub > li.case-item a:hover {
    .case-name {
      color: #cccccc
    }
    .case-item-status {
      color: #999999
    }
    .case-item-status.passed {
      color: lime;
    }
    .case-item-status.failed {
      color: @fuchsia;
    }
    .case-item-status.runned {
      color: @orange;
    }
    .case-item-status.excluded {
      color: blueviolet;
    }
  }

  aside .uui-side-bar ul > li.sub-menu .sub > li.case-item.active {

  }
</style>
