<template>
  <section class="suits-view">
    <h2>Suits View</h2>
  </section>
</template>

<script>
  export default {
    components: {
    },
    data() {
      return {
        activeSuit: null,
      };
    },
    methods: {
      getSuitById(suitId = this.$route.params.suitId) {
        console.log('suitView');
        this.activeSuit = this.$store.getters.getSuit(suitId);
      },
    },
    mounted() {
      if (this.$route.params.suitId) this.getSuitById();
    },
    updated() {
      // if (this.$route.params.suitId) this.getSuitById();
    },
    watch: {
      // eslint-disable-next-line object-shorthand
      '$route'(n) {
        this.getSuitById(n.params.suitId);
      },
    },
    name: 'SuitsView',
  };
</script>

<style lang="less" scoped>
.suits-view {

}
</style>
