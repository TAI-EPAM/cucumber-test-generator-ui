<template>
  <div class="cases-list">

    <div v-if="suit.cases && suit.cases.length">
      <v-data-grid
        :data="localCases"
        :columns="dataColumns"
        :onSelect="onSelect"
      >
      </v-data-grid>

    </div>

    <div class="buttons-holder">
      <v-button @click="addCaseView">Add Case</v-button>
      <v-button @click="deleteCase" markup="error">Delete Case</v-button>
    </div>


  </div>
</template>

<script>
  import VButton from '@/components/ui/VButton';
  import VDataGrid from '@/components/ui/VDataGrid';

  export default {
    components: {
      VButton,
      VDataGrid,
    },
    data() {
      return {
        localCases: this.$props.suit.cases,
        dataColumns: ['description', 'priority', 'updateDate'],
      };
    },
    methods: {
      addCaseView() {
        this.$bus.$emit('case-add-show');
      },
      caseView(item) {
        this.$bus.$emit('case-view-show', item);
      },
      deleteCase() {
        console.warn('1111');
      },
      onSelect(entry) {
        console.warn(entry);
      },
    },
    mounted() {
    },
    name: 'cases-list',
    props: {
      suit: {
        cases: {
          type: Array,
          default: [],
        },
        description: {
          type: String,
          default: null,
        },
        id: {
          type: Number,
          default: null,
        },
        name: {
          type: String,
          default: null,
        },
        priority: Number,
        default: 1,
        tags: {
          type: String,
          default: null,
        },
      },
    },
    watch: {
    },
  };
</script>

<style lang="scss" scoped>
  .cases-list {
    font-size: 12px;
    padding: 20px;
    border: 1px #f3f4f3 solid;
    border-radius: 3px;
  }
</style>
