<template>
  <section class="test-run" >
  <p>Test Run start</p>
    <p>{{ this.$store.state.selectedObject }}}</p>
  </section>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    name: 'test-run',
    computed: {
      ...mapGetters(
        {
          selectedObject: 'getSelectObject',
        },
      ),
    },
  };

</script>
