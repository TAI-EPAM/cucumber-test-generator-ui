<template>
  <section class="dashboard-view">
    <h2>Dashboard</h2>
    <ul>
      <li>
        <router-link to="suits">Home</router-link>
      </li>
    </ul>
  </section>
</template>

<script>
  export default {
    components: {
    },
    data() {
      return {
      };
    },
    methods: {
    },
    mounted() {
      this.$store.commit('setMenuIsOpen', false);
    },
    updated() {
    },
    watch: {
    },
    name: 'DashboardView',
  };
</script>

<style lang="less" scoped>
  .dashboard-view {

  }
</style>
