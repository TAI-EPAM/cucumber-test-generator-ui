<template>
  <div class="entity-card">
    <h3>Add Suit</h3>
    <div class="entity-card-edit">
      <label><span>Name:</span> <input type="text" v-model.lazy="suit.name"/></label>
      <label><span>Priority:</span>
        <select v-model="suit.priority">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </label>
      <label><span>Description:</span> <textarea maxlength="255" v-model.lazy="suit.description"/></label>
      <label><span>Tags:</span> <input type="text" v-model.lazy="suit.tags"/></label>
    </div>

    <div class="buttons-holder">
      <v-button @click="addSuit">Add Suit</v-button>
      <v-button @click="cancelAddSuit" markup="warning">Cancel</v-button>
    </div>
  </div></template>

<script>
  import AxiosClient from '@/utils/httpClient';
  import VButton from '@/components/ui/VButton';


  export default {
    components: { VButton },
    computed: {
    },
    data() {
      return {
        suit: {
          description: null,
          name: null,
          priority: 1,
          tags: null,
        },
        dirty: false,
      };
    },
    methods: {
      addSuit() {
        AxiosClient.post('/cucumber/suits/', this.suit)
          .then((response) => {
            this.suit.id = response.data;
            this.$bus.$emit('suit-add', this.suit);
          })
          .catch(() => {
          });
      },
      cancelAddSuit() {
        this.suit = {};
        this.$bus.$emit('suit-cancel');
      },

    },
    mounted() {
    },
    name: 'suit-add',
    props: {
    },
  };
</script>

<style lang="scss" scoped>

</style>
