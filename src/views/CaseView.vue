<template>
  <section class="case-view">
    <div v-if="$route.params.caseId">
      <case :local-case="localCase"/>

      <epam-button markup="large transparent" @click="editCase">edit case</epam-button>
      <epam-button markup="large" class="lime-green">Save Tests</epam-button>
      <epam-button markup="large" class="raspberry" @click="removeCase">Delete Case</epam-button>

      <keep-alive v-if="localCase">
          <case-history :case-name="localCase.name" :commits="this.getCurrentCommits"/>
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

  export default {
    components: {
      Case,
      CaseHistory,
      EpamButton,
      CaseEdit,
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
      getData(suitId = this.$route.params.suitId, caseId = this.$route.params.caseId) {
        this.$store.dispatch('getCaseHistoryAsync', { suitId, caseId })
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
    },
    mounted() {
      if (this.$route.params.suitId && this.$route.params.caseId) {
        this.getData();
      }
    },
    computed: {
      ...mapGetters(['isAuth', 'getToken', 'getCase', 'getCurrentCommits']),
    },
    watch: {
      // eslint-disable-next-line object-shorthand
      '$route'(n) {
        if (n.params.suitId && n.params.caseId) {
          this.getData(n.params.suitId, n.params.caseId);
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
