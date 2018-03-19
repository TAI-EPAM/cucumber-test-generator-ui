<template>
  <div class="project-menu-filter">
    <div class="search-panel">
      Search by name: <input type="text" v-model="entity.searchString" />
    </div>
    <div class="sort-panel">
      <div>SortBy:</div>
      <select v-model="entity.sortField">
        <option value="creationDate">Date Creation</option>
        <option value="name">Name</option>
        <option value="priority">Priority</option>
      </select>
      <input type="checkbox" v-model="entity.isReverse" />
    </div>
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
    },
    name: 'ProjectMenuFilters',
    props: ['value'],
    watch: {
      entity: {
        handler() {
          if (this.entity.searchString) {
            this.entity.searchString = this.entity.searchString.trim().toLowerCase();
          }
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
  display:flex;
  flex-wrap:wrap;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 60px;
  font-size: 11px;

  & .search-panel {
    flex: 1 50%;
    overflow: hidden;
  }
  & .sort-panel {
    flex: 1 50%;
  }
}
</style>
