<template>
  <div class="suit-card">
    <h3>Suit Edit</h3>
    <div class="suit-card-edit">
      <label><span>Name:</span> <input type="text" v-model.lazy="localSuit.name"/></label>
      <label><span>Priority:</span>
        <select v-model="localSuit.priority">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </label>
      <label><span>Description:</span> <textarea maxlength="255" v-model.lazy="localSuit.description"/></label>
      <label><span>Tags:</span> <input type="text" v-model.lazy="localSuit.tags"/></label>
    </div>

    <div class="buttons-holder">
      <v-button @click="saveSuit">Save Suit</v-button>
      <v-button @click="cancelEditSuit" markup="warning">Cancel</v-button>
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
        localSuit: Object.assign({}, this.suit),
        dirty: false,
      };
    },
    methods: {
      cancelEditSuit() {
        this.localSuit = Object.assign({}, this.suit);
        this.$bus.$emit('suit-cancel', this.localSuit);
      },
      saveSuit() {
        AxiosClient.post('/cucumber/suits/', this.localSuit)
          .then(() => {
            Object.assign(this.suit, this.localSuit);
            this.$bus.$emit('suit-save', this.localSuit);
          })
          .catch(() => {
          });
      },
    },
    mounted() {

    },
    name: 'suit-edit',
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
      suit(newValue) {
        this.$data.localSuit = Object.assign({}, newValue);
        this.dirty = false;
      },
    },
  };

</script>

<style lang="scss" scoped>

</style>
