<template>
  <li class="case-item">
    <div class="checkbox-wrapper">
      <input type="checkbox" v-model="selected" />
    </div>
    <router-link :to="{ name: 'caseView', params: { suitId, caseId: caseItem.id }}">
      <span>{{caseItem.name}}</span> <priority-icon v-model="caseItem.priority" /> {{ caseItem.status }}
    </router-link>
  </li>
</template>

<script>
  import PriorityIcon from '../ui/PriorityIcon';

  export default {
    components: {
      PriorityIcon,
    },
    computed: {
    },
    data() {
      return {
        selected: false,
      };
    },
    methods: {
    },
    props: ['caseItem', 'selectedObject', 'suitId'],
    name: 'ProjectMenuCaseItem',
    watch: {
      selected(newValue) {
        if (newValue) {
          this.selectedObject.cases.push(this.caseItem.id);
        } else {
          this.selectedObject.cases.splice(this.selectedSuits.cases.indexOf(this.caseItem.id), 1);
        }
      },
    },
  };
</script>

<style lang="less">
   aside .uui-side-bar ul > li.sub-menu .sub > li.case-item {

     & > a {
       margin-left: 10px;
       padding: 0;
       width: auto;
       line-height: 50px;

       & > i {
         line-height: 50px;
       }

       & > span {
         font-size: 14px;
         line-height: 24px;
       }
     }

     & .checkbox-wrapper {
       display: inline-block;
       margin-left: 54px;
       line-height: 30px;
     }
   }
</style>
