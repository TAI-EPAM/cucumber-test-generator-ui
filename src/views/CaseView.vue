<template>
  <section class="case-view">
    <div v-if="$route.params.caseId">
      <case :local-case="localCase"/>

      <epam-button markup="large transparent" @click="editCase">edit case</epam-button>
      <epam-button markup="large" class="lime-green">Save Tests</epam-button>
      <epam-button markup="large" class="raspberry" @click="removeCase">Delete Case</epam-button>

      <keep-alive v-if="localCase">
          <!--case-history :case-name="localCase.name" :commits="this.getCommits.filter(el => !isCreatedCommit(el))"/-->
          <curtain
            buttonClass="case-history-button orange"
            buttonText="Show history"
            headerText="HISTORY"
            headerMarkup="orange"
            :component="getCertainComponent()">
          ></curtain>
      </keep-alive>
    </div>
    <div v-else>
      Nothing
    </div>
  </section>
</template>

<script>
  import equal from 'array-equal';
  import { mapGetters } from 'vuex';
  import Case from '@/components/Case';
  import CaseHistory from '@/components/case/CaseHistory';
  import Confirmation from '@/components/Confimation';
  import EpamButton from '@/components/ui/EpamButton';
  import CaseEdit from '@/components/case/CaseEdit';
  import Curtain from '@/components/ui/Curtain';

  export default {
    components: {
      Case,
      CaseHistory,
      EpamButton,
      CaseEdit,
      Curtain,
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
              this.$store.dispatch('deleteCaseAsync', { projectId: this.$route.params.projectId, suitId: this.$route.params.suitId, caseId: vm.localCase.id })
               .then(() => {
                 this.$router.push({ path: `/projects/${this.$route.params.projectId}` });
                 this.$vuedals.close();
               });
            },
          },
        });
      },
      getData(projectId = this.$route.params.projectId,
        suitId = this.$route.params.suitId,
        caseId = this.$route.params.caseId) {
        this.$store.dispatch('getCaseHistoryAsync', { projectId, suitId, caseId })
          .then(() => {
            this.localCase = this.getCase(suitId, caseId);
          });
      },
      isCreatedCommit(commit) {
        const attributes = ['id', 'name', 'description', 'creationDate', 'updateDate', 'priority', 'status'];
        const oldValues = [];
        const existAttributes = commit.propertyDifferences.map((el) => {
          oldValues.push(el.oldValue);
          return el.propertyName;
        });
        if (oldValues.find(el => el != null) || !equal(attributes, existAttributes)) {
          return false;
        }
        return true;
      },
      getCertainComponent() {
        return {
          component: CaseHistory,
          props: [
            { caseName: this.localCase.name },
            { commits: this.getCommits.filter(el => !this.isCreatedCommit(el)) },
          ],
        };
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
        getCommits: 'getCurrentCommits',
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
