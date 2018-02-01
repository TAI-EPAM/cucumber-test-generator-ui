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

    <div class="debug">
      {{ localCase.description }}
      <p>dirty: {{ isDirty }}</p>
    </div>
</div>
<div v-else>
Choose case
</div>
  </section>
</template>

<script>
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
        this.$store.commit('updateCase', { suitId: this.$route.params.suitId, caseId: this.$route.params.caseId, updateData: this.localCase });
        AxiosClient.put(`/cucumber/projects/${PROJECT_ID}/suits/${this.$route.params.suitId}/cases/${this.$route.params.caseId}`, this.localCase)
          .then((resp) => {
            console.warn(resp);
          })
          .catch(() => {
          });
      },
      editCase() {
        const vm = this;
        this.$vuedals.open({
          title: 'Edit Case',
          component: CaseEdit,
          props: {
            value: this.localCase,
            suitId: this.$route.params.suitId,
            onCancel() {
              this.$vuedals.close();
            },
            onSubmit(updateData_) {
              this.$vuedals.close();
              vm.localCase = updateData_;
              this.$store.commit('updateCase', { suitId: vm.suitId, caseId: vm.localCase.id, updateData: updateData_ });
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
              AxiosClient.delete(`/cucumber/projects/${PROJECT_ID}/suits/${this.$route.params.suitId}
              /cases/${vm.localCase.id}`)
                .then(() => {
                  this.$store.commit('removeCase', { suitId: this.$route.params.suitId, caseId: vm.localCase.id });
                  this.$vuedals.close();
                })
                .catch(() => {
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
