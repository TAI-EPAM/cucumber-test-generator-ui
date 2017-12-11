<template>
  <section class="case-view">
    <div v-if="$route.params.caseId">
      <case v-model="localCase" v-if="localCase" />
    </div>
    <div v-else>
      Nothing
    </div>
  </section>
</template>

<script>
  import Case from '@/components/Case';

  export default {
    components: {
      Case,
    },
    data() {
      return {
        localCase: null,
      };
    },
    methods: {
      getCaseFromStore(suitId = this.$route.params.suitId, caseId = this.$route.params.caseId) {
        this.localCase = this.$store.getCase(suitId, caseId);
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
          console.warn('case view');
          this.localCase = n;
          console.warn(this.localCase);
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
