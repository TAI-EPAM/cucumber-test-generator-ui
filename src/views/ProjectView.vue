<template>
  <section class="project-view" v-if="localProject">
    <h2>{{localProject.name}}</h2>
    <p><span>active: {{localProject.active}}</span></p>
    <p>{{localProject.description}}</p>
  </section>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    components: {
    },
    data() {
      return {
        localProject: null,
      };
    },
    methods: {
      getData(projectId = this.$route.params.projectId) {
        this.$store.dispatch('getProjectByIdAsync', projectId)
          .then(() => {
            this.localProject = this.getActiveProject;
          });
      },
    },
    mounted() {
      const projectId = this.$route.params.projectId;
      if (projectId) {
        this.getData(projectId);
      }
      this.$store.commit('setMenuIsOpen', true);
    },
    updated() {

    },
    computed: {
      ...mapGetters(['getActiveProject']),
    },
    watch: {
      // eslint-disable-next-line object-shorthand
      '$route'(n) {
        if (n.params.projectId) {
          this.getData(n.params.projectId);
        }
      },
    },
    name: 'ProjectView',
  };
</script>

<style lang="less" scoped>
  .project-view {

  }
</style>
