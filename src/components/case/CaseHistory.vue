<template>
  <div v-if="commits && commits.length">
    <div v-for="item in commits">
      <case-commit-item  :caseName="caseName" :commit="item"/>
    </div>
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
@import "../../assets/vendors/epam-ui/less/uui-core.less";
@import "../../assets/vendors/epam-ui/less/uui-form-elements.less";
  .case-history-button
  {
    position: fixed;
    top: 200px;
    right: -45px;
    transform: rotate(-90deg);
  }
  .case-history-window
  {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 11000;
  background-color: #FFF;
  height: 100vh;
  width: 600px;
  }

  .case-history-header
  {
    background-color: @orange;
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    padding: 10px 15px;
  }

  .case-history-wrapper
  {
  background-color: rgba(0,0,0,.5);
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 10500;
  }

  .no-commits-message
  {
    margin: 30px 30px;
    font-style: italic;
    font-size: 20px;
  }
</style>
