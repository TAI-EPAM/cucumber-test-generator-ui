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
  import PriorityIcon from '../PriorityIcon';

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
          this.selectedObject.cases.splice(this.selectedObject.cases.indexOf(this.caseItem.id), 1);
        }
      },
    },
  };
</script>

<style lang="less">
   aside .uui-side-bar ul > li.sub-menu .sub > li.case-item > a > span {
     font-size: 16px;
   }

  .case-item {

    .checkbox-wrapper {
      display: inline-block;
      margin-left: 64px;
    }

    a {
      margin-left: 10px;
      padding-left: 0!important;
      width: auto!important;
    }

  }
</style>
