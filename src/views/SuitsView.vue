<template>
  <section class="suits-view">
    <h2>Suits View</h2>
    <div v-if="$route.params.suitId">
      <suit-edit v-if="activeSuit" v-model="activeSuit" />
    </div>
    <div v-else>
      <suit-add />
    </div>

  </section>
</template>

<script>
  import SuitAdd from '@/components/SuitAdd';
  import SuitEdit from '@/components/SuitEdit';


  export default {
    components: {
      SuitAdd,
      SuitEdit,
    },
    data() {
      return {
        activeSuit: null,
      };
    },
    methods: {
      getSuitById(suitId = this.$route.params.suitId) {
        this.activeSuit = this.$store.getSuit(suitId);
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
