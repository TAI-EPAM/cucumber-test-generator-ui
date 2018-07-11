<template>
  <div>
    <div class="test-case-top"></div>
    <div class="test-case-view">
      {{this.$store.state.saveCaseForTestRun}}
    </div>
  </div>
</template>

<script>
  export default {
    name:'TestRunCase',
    components: {
    },
    data() {
      return {
      };
    },
    methods: {},
  }
</script>

<style>

</style>
