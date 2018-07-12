<template>
  <section class="test-run" >
    <test-run-case :local-case="this.localCase" ></test-run-case>
  </section>
</template>

<script>
  import { mapGetters } from 'vuex';
  import TestRunCase from '../test run components/TestRunCase';

  export default {
    name: 'test-run',
    data(){
      return{
        localSuit: null,
        localCase: null,
      }
    },
    components:{
      TestRunCase,
    },
    computed: {
      ...mapGetters(
        {
          selectedObject: 'getSelectObject',
        },
      ),
    },
  methods: {
    getCases (
      suitId = this.$route.params.suitId,
      caseId = this.$route.params.caseId ) {
      this.localSuit = this.$store.state.activeProject.suits.find(item => item.id === +suitId);
      this.localCase = JSON.parse(JSON.stringify(this.localSuit)).cases.find(item => item.id === +caseId);
    },
  },
  mounted() {
    this.getCases();
  },
  watch: {
    '$route'(n) {
      if ( n.params.suitId && n.params.caseId) {
        this.getCases( n.params.suitId, n.params.caseId);
      }
    },
  }
  };

</script>
