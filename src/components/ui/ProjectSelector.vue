<template>
  <div class="project-selector">
    <select v-model="selected">
      <option disabled value="0">Please select project</option>
      <option v-for="project in projects" :value="project.id">
        {{ project.name }}
      </option>
    </select>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    components: {

    },
    computed: {
      ...mapGetters(['getProjects']),
    },
    data() {
      return {
        projects: [],
        selected: 0,
      };
    },
    methods: {
    },
    mounted() {
      this.projects = this.getProjects;
      if (this.$route.params.projectId) {
        this.selected = this.$route.params.projectId;
      }
    },
    watch: {
      selected(newValue) {
        this.$router.push({ name: 'Project', params: { projectId: newValue } });
      },
    },
    name: 'ProjectSelector',
  };
</script>

<style scoped lang="less">
  .project-selector {
    display: inline-block;
    margin: 0 20px;
    select {
      margin-top: 20px;
    }
  }
</style>
