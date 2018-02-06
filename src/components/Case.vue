<template>
  <section class="panel">
  <div v-if="localCase">
  <h2>{{ localCase.name }}</h2>
    <div class="case-props">
      <ul>
        <li>Status: <span>NOT DONE</span></li>
        <li>Priority: <span>{{localCase.priority}}</span></li>
      </ul>
      <ul>
        <li>Creation Date: {{localCase.creationDate}}</li>
        <li>Last update Date: {{localCase.updateDate}}</li>
      </ul>
      <p>{{localCase.description}}</p>
    </div>
   
    <!-- Steps-->
    <!--<case-steps v-model="localCase.steps"></case-steps>-->

    <epam-button markup="large transparent" @click="editCase">edit case</epam-button>
    <epam-button markup="large" class="lime-green" @click="saveCase">Save Tests</epam-button>
    <epam-button markup="large" class="raspberry" @click="removeCase">Delete Case</epam-button>
</div>
<div v-else>
Choose case
</div>
  </section>
</template>

<script>
  import EpamButton from './ui/EpamButton';
  import CaseSteps from './CaseSteps';
  export default {
    components: {
      CaseSteps,
    },
    computed: {
    },
    data() {
      return {};
    },
    methods: {
      saveCase() {
        this.$store.dispatch('updateCaseAsync', { suitId: this.$route.params.suitId, caseId: this.$route.params.caseId, updateData: this.localCase });
      },
      editCase() {
        this.$vuedals.open({
          title: 'Edit Case',
          component: CaseEdit,
          props: {
            value: this.localCase,
            suitId: this.$route.params.suitId,
            onCancel() {
              this.$vuedals.close();
            },
            onSubmit() {
              this.$vuedals.close();
            },
          },
        });
      },
      removeCase() {
        const vm = this;
        this.$vuedals.open({
          title: 'Delete Case',
          component: Confirmation,
          props: {
            suitId: this.$route.params.suitId,
            onCancel() {
              this.$vuedals.close();
            },
            onSubmit() {
              this.$store.dispatch('deleteCaseAsync', { suitId: this.$route.params.suitId, caseId: vm.localCase.id })
               .then(() => {
                 this.$router.push({ path: '/suits/' });
                 this.$vuedals.close();
               });
            },
          },
        });
      },
    },
    props: ['localCase'],
    name: 'Case',
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
