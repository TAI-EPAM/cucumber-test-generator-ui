<template>
  <section class="test-run" >
  <p v-if="!this.$store.state.saveCaseForTestRun">TEST RUN VIEW</p>
  <test-run-case v-else="this.$store.state.saveCaseForTestRun">

  </test-run-case>
  </section>
</template>

<script>
  import { mapGetters } from 'vuex';
  import TestRunCase from '../test run components/TestRunCase';

  export default {
    name: 'test-run',
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
  };

</script>
