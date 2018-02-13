<template>
  <section class="panel">
  <div v-if="localCase">
    <div class="case-props">
      <div class="case-props-main">
         <h2>{{ localCase.name }}</h2>
         <ul>
           <li><span class="case-prop-name">Status: </span><span>NOT DONE</span></li>
           <li><span class="case-prop-name">Priority: </span><span>{{localCase.priority}}</span></li>
         </ul>
      </div>
    <div class="case-props-additional">
        <ul>
           <li><span class="case-prop-name">Creation Date: </span>{{localCase.creationDate | formatDate}}</li>
           <li><span class="case-prop-name">Last Update Date: </span>{{localCase.updateDate | formatDate}}</li>
           <li><span class="case-prop-name">Description: </span>{{localCase.description}}</li>
        </ul>
    </div>
   </div>
   
    <!-- Steps-->
    <case-steps v-model="localCase.steps"></case-steps>

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
    flex-wrap: wrap;
    background: white;
    border: 1px #ebeef0 solid;
    padding: 20px 30px;
      .case-props-main {
        border-right: 1px #ebeef0 solid;
        padding-right: 10px;
    }
    .case-props-additional {
      padding-left: 20px;
    }
  }
  li {
    list-style-type: none;
  }
  .case-prop-name {
    font-weight: bold;
  }
</style>
