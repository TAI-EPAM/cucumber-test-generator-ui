<template>
  <section class="case-view" v-if="$route.params.caseId">
      <case-top-menu :local-case="localCase" v-if="localCase"></case-top-menu>
      <case :local-case="localCase"/>

      <epam-button markup="large transparent" @click="editCase">edit case</epam-button>
      <epam-button markup="large" class="lime-green">Save Tests</epam-button>
      <epam-button markup="large" class="raspberry" @click="removeCase">Delete Case</epam-button>

      <!--case-history :case-name="localCase.name" :commits="this.getCommits.filter(el => !isCreatedCommit(el))"/-->
  </section>
</template>

<script>
  import { mapGetters } from 'vuex';
  import Case from '@/components/Case';
  import Confirmation from '@/components/Confimation';
  import EpamButton from '@/components/ui/EpamButton';
  import CaseEdit from '@/components/case/CaseEdit';
  import CaseTopMenu from '../components/case/CaseTopMenu';

  /* eslint-disable */

  export default {
    components: {
      Case,
      EpamButton,
      CaseEdit,
      CaseTopMenu,
    },
    data() {
      return {
        localCase: null,
      };
    },
    methods: {
      editCase() {
        this.$vuedals.open({
          title: 'Edit Case',
          component: CaseEdit,
          props: {
            value: this.localCase,
            projectId: this.$route.params.projectId,
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
              const removeCaseIds = [];
              removeCaseIds.push(vm.localCase.id);
              this.$store.dispatch('deleteCaseAsync',
                { projectId: this.$route.params.projectId, suitId: this.$route.params.suitId, removeCaseIds }
              )
              .then(() => {
                 this.$router.push({ path: `/projects/${this.$route.params.projectId}` });
                 this.$vuedals.close();
               });
            },
          },
        });
      },
      // saveTests(){},
      getData(projectId = this.$route.params.projectId,
        suitId = this.$route.params.suitId,
        caseId = this.$route.params.caseId) {
        this.$store.dispatch('getCaseHistoryAsync', { projectId, suitId, caseId })
          .then(() => {
            this.$router.push({ path: `/projects/${projectId}/suits/${suitId}/case/${caseId}` });
            this.localCase = this.getCase(suitId, caseId);
          });
      },
    },
    mounted() {
      if (this.$route.params.projectId &&
           this.$route.params.suitId &&
           this.$route.params.caseId) {
        this.getData();
      }
    },
    computed: {
      ...mapGetters({
        isAuth: 'isAuth',
        getToken: 'getToken',
        getCase: 'getActiveCaseById',
      }),
    },
    watch: {
      // eslint-disable-next-line object-shorthand
      '$route'(n) {
        if (n.params.projectId && n.params.suitId && n.params.caseId) {
          this.getData(n.params.projectId, n.params.suitId, n.params.caseId);
        }
      },
    },
    name: 'CaseView',
  };
</script>

<style lang="less" scoped>
  .case-view {

  }
</style>

<style lang="less">
  .case-history-button {
    position: fixed;
    top: 200px;
    right: -45px;
    transform: rotate(-90deg);
  }

</style>
