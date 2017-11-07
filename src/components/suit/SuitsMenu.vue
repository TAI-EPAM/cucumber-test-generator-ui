<template>
  <div class="suits-menu">
    <draggable v-model="localItems" v-if="localItems">
      <div @click="handleClick(index, item)" v-for="(item, index) in localItems" class="suit-menu-item">
        <span>{{item.name}}</span>
      </div>
    </draggable>
  </div>
</template>

<script>
  import draggable from 'vuedraggable';

  export default {
    components: {
      draggable,
    },
    data() {
      return {
        localItems: this.items,
      };
    },
    methods: {
      handleClick(index, item) {
        if (this.menuClick) this.menuClick(index, item);
      },
    },
    mounted() {
    },
    name: 'suits-menu',
    props: {
      items: {
        type: Array,
        default: [],
      },
      menuClick: {
        type: Function,
        default: null,
      },
    },
    watch: {
      items(newValue) {
        this.$data.localItems = newValue;
      },
    },
  };
</script>

<style lang="scss" scoped>
  .suits-menu {
    margin: 10px 20px;
    ul {
      list-style: none;
      margin: 0;
      padding: 0;
    }
    li,
    .suit-menu-item {
      margin: 10px 0;
      border-radius: 2px;
      border: 1px solid rgba(0,0,0,0.1);
      font-size: 12px;
      padding: 8px 5px;
      &:hover {
        cursor: pointer;
      }
      &.sortable-ghost {
        opacity: 1;
        border-style: dashed;
        border-color: red;
      }
    }
  }
</style>
