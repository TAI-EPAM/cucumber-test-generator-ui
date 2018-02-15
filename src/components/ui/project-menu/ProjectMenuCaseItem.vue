<template>
  <li class="case-item">
    <div class="checkbox-wrapper">
      <input type="checkbox" v-model="selected" />
    </div>
    <router-link :to="{ name: 'caseView', params: { suitId, caseId: caseItem.id }}">
      <span>{{caseItem.name}} | {{caseItem.priority }} | {{ caseItem.status }}</span>
    </router-link>
  </li>
</template>

<script>
  export default {
    components: {
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
  .case-item {

    .checkbox-wrapper {
      display: inline-block;
      margin-left: 40px;
    }

    a {
      margin-left: 10px;
      padding-left: 0!important;
      width: auto!important;
    }

  }
</style>
