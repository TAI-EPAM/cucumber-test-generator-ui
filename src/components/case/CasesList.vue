<template>
  <div class="cases-list">

    <div v-if="suit.cases.length">
      <div>
        <span>Description</span>
        <span>Priority</span>
      </div>
      <div v-for="(item, index) in suit.cases">
        {{item.description}} / {{item.priority}}
      </div>
    </div>

    <div class="buttons-holder">
      <v-button @click="addCaseView">Add Case</v-button>
    </div>


  </div>
</template>

<script>
  import VButton from '@/components/ui/VButton';

  export default {
    components: {
      VButton,
    },
    data() {
      return {
        localCases: this.$props.suit.cases,
      };
    },
    methods: {
      addCaseView() {
        this.$bus.$emit('mode-change', ['caseMode', 'add']);
        this.$bus.$emit('mode-change', ['suitMode', 'none']);
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
