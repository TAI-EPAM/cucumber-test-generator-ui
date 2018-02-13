<template>
  <div v-if="commits && commits.length">
    <div v-for="item in commits">
      <case-commit-item  :caseName="caseName" :commit="item"/>
    </div>
  </div>
  <div v-else >
    <p class="no-commits-message">No commits yet</p>
  </div>
</template>


<script>
  import EpamButton from '../ui/EpamButton';
  import CaseCommitItem from './CaseCommitItem';

  export default {
    components: {
      EpamButton,
      CaseCommitItem,
    },
    data() {
      return {

      };
    },
    methods: {
    },
    mounted() {
    },
    updated() {
    },
    watch: {
    },
    name: 'case-history',
    props: ['caseName', 'commits'],
  };
</script>

<style lang="less" scoped>
.no-commits-message {
  margin: 20px;
  font-size: 20px;
  font-style: italic;
}
</style>
