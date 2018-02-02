<template>
  <section class="case-view">
    <div v-if="$route.params.caseId">
      <case v-model="localCase" v-if="localCase" />
      <keep-alive v-if="localCase">
          <case-history :case-name="localCase.name" :commits="commits.filter(el => !isCreatedCommit(el))"/>
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

  export default {
    components: {
      Case,
      CaseHistory,
    },
    data() {
      return {
        localCase: null,
        commits: [],
      };
    },
    methods: {
      parseAttributesFromStr(str) {
        if (!str) {
          return {
            id: '',
            rowNumber: '',
            description: '',
            type: '',
          };
        }
        const result = str.match(/=(.*?)[,}]/ig).map(el => el.slice(1, -1)) || [];
        return {
          id: +result[0],
          rowNumber: +result[1],
          description: result[2],
          type: result[3],
        };
      },
      convertSteps(commit) {
        const c = commit;
        c.propertyDifferences = c.propertyDifferences.map((item) => {
          if (item.propertyName === 'steps') {
            const i = item;
            i.oldValue = this.parseAttributesFromStr(item.oldValue);
            i.newValue = this.parseAttributesFromStr(item.newValue);
            return i;
          }
          return item;
        });
        return c;
      },
      getCaseFromStore(suitId = this.$route.params.suitId, caseId = this.$route.params.caseId) {
        this.localCase = this.$store.getters.getCase(suitId, caseId);
      },
      fetchCommits(suitId = this.$route.params.suitId, caseId = this.$route.params.caseId) {
        this.$store.dispatch('getCaseHistoryAsync', { suitId, caseId })
          .then(resp => resp.data.map(commit => this.convertSteps(commit)))
          .then((res) => { this.commits = res; });
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
        this.getCaseFromStore();
        this.fetchCommits();
      }
    },
    updated() {

    },
    computed: {
      ...mapGetters(['isAuth', 'getToken']),
    },
    watch: {
      // eslint-disable-next-line object-shorthand
      '$route'(n) {
        this.getCaseFromStore(n.params.suitId, n.params.caseId);
        this.fetchCommits(n.params.suitId, n.params.caseId);
      },
      localCase: {
        handler(n) {
          this.localCase = n;
        },
        deep: true,
      },
    },
    name: 'CaseView',
  };
</script>

<style lang="less" scoped>
  .case-view {

  }
</style>
