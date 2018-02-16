<template>
  <div class="project-menu-filter">
    <div>SortBy:</div>
    <select v-model="entity.sortField">
      <option value="creationDate">Date Creation</option>
      <option value="name">Name</option>
      <option value="priority">Priority</option>
    </select>
  </div>
</template>

<script>
  export default {
    components: {
    },
    computed: {
    },
    data() {
      return {
        entity: Object.assign({}, this.value),
      };
    },
    methods: {
    },
    mounted() {
      console.warn(this.value);
    },
    name: 'ProjectMenuFilters',
    props: ['value'],
    watch: {
      entity: {
        handler() {
          this.$emit('input', this.entity);
        },
        deep: true,
      },
    },
  };
</script>

<style scoped lang="less">
.project-menu-filter {
  color: white;
}
</style>
