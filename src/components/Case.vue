<template>
  <section class="panel">
  <div v-if="localCase">
  <h2>{{ localCase.name }}</h2>
    <div class="case-props">
      <ul>
        <li>Status: <span>NOT DONE</span></li>
        <li>Priority: <span>{{localCase.priority}}</span></li>
      </ul>
      <ul>
        <li>Creation Date: {{localCase.creationDate}}</li>
        <li>Last update Date: {{localCase.updateDate}}</li>
      </ul>
      <p>{{localCase.description}}</p>
    </div>
   
    <!-- Steps-->
    <!--<case-steps v-model="localCase.steps"></case-steps>-->

</div>
<div v-else>
Choose case
</div>
  </section>
</template>

<script>
  import CaseSteps from './CaseSteps';
  export default {
    components: {
      CaseSteps,
    },
    computed: {
    },
    data() {
      return {};
    },
    methods: {
    },
    props: ['localCase'],
    name: 'Case',
  };
</script>

<style lang="less" scoped>
  .case-props {
    display: flex;
    & ul {
      flex: 0.3;
      list-style: none;
      & li {
        display: inline-block;
      }
    }
  }
</style>
