<template>
  <div v-if="localSuit" class="suit-card">
    <div>id:  {{localSuit.id }}</div>
    <div>name: {{localSuit.name }}</div>
    <div>priority: {{localSuit.priority }}</div>
    <div>tags: {{localSuit.tags }}</div>
    <div>description: <p>{{localSuit.priority }}</p></div>
    <div>
      <v-button @click="removeSuit" markup="error">Remove Suit</v-button>
    </div>
  </div>

</template>

<script>
  import AxiosClient from '@/utils/httpClient';
  import VButton from './ui/VButton';

  export default {
    components: { VButton },
    computed: {
    },
    data() {
      return {
        localSuit: Object.assign({}, this.suit),
        dirty: false,
      };
    },
    methods: {
      removeSuit() {
        const suitId = this.localSuit.id;
        AxiosClient.delete(`/cucumber/suits/${suitId}`)
          .then(() => {
            this.$router.push({ name: 'suits' });
            this.$bus.$emit('suit-delete', suitId);
          })
          .catch((e) => {
            console.warn(e);
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
        tags: {
          type: String,
          default: null,
        },
      },
    },
    watch: {
      suit(newValue) {
        this.localSuit = Object.assign({}, newValue);
        this.dirty = false;
      },
    },
  };
</script>

<style lang="scss" scoped>

  .suit-card {
    margin: 40px 0 0 0;
    width: 400px;
    & div {
      margin: 0 0 10px 0;
    }
  }

</style>
