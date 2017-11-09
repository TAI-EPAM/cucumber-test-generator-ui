<template>
  <div class="entity-card">
    <h3>{{suit.name}} <span class="priority">priority: {{suit.priority }}</span> </h3>
    <ul class="entity-props">
      <li>{{suit.description }}</li>
      <li>created: {{ suit.creationDate}}</li>
      <li class="suit-tags"><strong>tags:</strong> {{suit.tags }}</li>
    </ul>
    <div class="buttons-holder">
      <v-button @click="editSuit">Edit Suit</v-button>
      <v-button @click="removeSuit" markup="error">Remove Suit</v-button>
    </div>
  </div>
</template>

<script>
  import AxiosClient from '@/utils/httpClient';
  import VButton from '@/components/ui/VButton';

  export default {
    components: { VButton },
    computed: {
    },
    data() {
      return {
      };
    },
    methods: {
      editSuit() {
        this.$bus.$emit('suit-edit');
      },
      removeSuit() {
        const suitId = this.suit.id;
        AxiosClient.delete(`/cucumber/suits/${suitId}`)
          .then(() => {
            this.$router.push({ name: 'suits' });
            this.$bus.$emit('suit-delete', suitId);
          })
          .catch(() => {

          });
      },
    },
    mounted() {

    },
    name: 'suit',
    props: {
      suit: {
        description: {
          type: String,
          default: null,
        },
        id: {
          type: Number,
          default: null,
        },
        name: {
          type: String,
          default: null,
        },
        priority: Number,
        default: 1,
        tags: {
          type: String,
          default: null,
        },
      },
    },
    watch: {
    },
  };
</script>

<style lang="scss" scoped>

</style>
