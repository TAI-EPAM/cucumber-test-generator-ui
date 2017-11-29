<template>
  <section class="panel">
    <h2>Case {{ $route.params.caseId }}</h2>
  </section>
</template>

<script>
  export default {
    components: {
    },
    data() {
      return {
        title: 'Case',
        suit: {},
      };
    },
    methods: {
    },
    mounted() {
    },
    name: 'Case',
  };
</script>

<style lang="less" scoped>

</style>
