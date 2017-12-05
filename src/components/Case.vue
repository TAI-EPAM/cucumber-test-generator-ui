<template>
  <section class="panel">
  <h2>{{ localCase.description }}</h2>
    <div class="case-props">
      <ul>
        <li>Status: <span>NOT DONE</span></li>
        <li>Priority: <span>{{localCase.priority}}</span></li>
      </ul>
      <ul>
        <li>Creation Date: {{localCase.creationDate}}</li>
        <li>Last update Date: {{localCase.updateDate}}</li>
      </ul>
    </div>

    <!-- Steps-->
    <case-steps v-model="localCase.steps"></case-steps>

    <epam-button markup="large" class="lime-green" @click="saveCase">Save Tests</epam-button>




  </section>
</template>

<script>
  import AxiosClient from '../utils/httpClient';
  import EpamButton from './ui/EpamButton';
  import CaseSteps from './CaseSteps';

  export default {
    components: {
      EpamButton,
      CaseSteps,
    },
    data() {
      return {
        localCase: JSON.parse(JSON.stringify(this.value)),
      };
    },
    methods: {
      saveCase() {
        this.$store.updateCase(this.$route.params.suitId, this.$route.params.caseId, this.localCase);
        AxiosClient.put(`/cucumber/suits/${this.$route.params.suitId}/cases/${this.$route.params.caseId}`, this.localCase)
          .then((resp) => {
            console.warn(resp);
          })
          .catch(() => {
          });
      },
    },
    mounted() {
    },
    props: ['value'],
    name: 'Case',
    watch: {
      value(n) {
        this.localCase = JSON.parse(JSON.stringify(n));
      },
    },
  };
</script>

<style lang="less" scoped>
  .case-props {
    display: flex;
    & ul {
      flex: 0.3;
      list-style: none;

      & li {
        display: inline-block;
      }
    }
  }

</style>
