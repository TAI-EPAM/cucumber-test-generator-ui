<template>
  <section class="project-view" v-if="entity">
    <h2>{{entity.name}}</h2>
    <p><span>active: {{entity.active}}</span></p>
    <p>{{entity.description}}</p>
  </section>
</template>

<script>
  import AxiosClient from '../utils/httpClient';

  export default {
    components: {
    },
    data() {
      return {
        entity: null,
      };
    },
    beforeRouteEnter(to, from, next) {
      next((vm) => {
        vm.getProjectById(to.params.projectId);
      });
    },
    beforeRouteUpdate(to, from, next) {
      this.entity = null;
      this.getProjectById(to.params.projectId);
      next();
    },
    methods: {
      getProjectById(projectId = this.$route.params.projectId) {
        AxiosClient.get(`/cucumber/projects/${projectId}`)
          .then((response) => {
            this.entity = response.data;
            this.$store.commit('setActiveProject', { data: response.data });
          })
          .catch((err) => {
            console.warn(err);
          });
      },
    },
    mounted() {
      this.$store.commit('setMenuIsOpen', true);
    },
    updated() {

    },
    watch: {
    },
    name: 'ProjectView',
  };
</script>

<style lang="less" scoped>
  .project-view {

  }
</style>
