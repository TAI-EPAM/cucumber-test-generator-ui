<template>
  <section class="dashboard-view">
    <h2 class="dashboard-title">Dashboard</h2>
    <!-- <ul>
      <li>
        <router-link to="/">Home</router-link>
      </li>
    </ul> -->
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

 .dashboard-title {
    text-align: center;
  }
</style>
