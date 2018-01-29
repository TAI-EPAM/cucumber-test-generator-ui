<template>
  <section class="case-view">
    <div v-if="$route.params.caseId">
      <case v-model="localCase" v-if="localCase" />
      <keep-alive v-if="localCase">
          <case-history/>
      </keep-alive>
    </div>
    <div v-else>
      Nothing
    </div>
  </section>
</template>

<script>
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
      };
    },
    methods: {
      getCaseFromStore(suitId = this.$route.params.suitId, caseId = this.$route.params.caseId) {
        this.localCase = this.$store.getters.getCase(suitId, caseId);
      },
    },
    mounted() {
      if (this.$route.params.suitId && this.$route.params.caseId) this.getCaseFromStore();
    },
    updated() {

    },
    watch: {
      // eslint-disable-next-line object-shorthand
      '$route'(n) {
        this.getCaseFromStore(n.params.suitId, n.params.caseeId);
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
