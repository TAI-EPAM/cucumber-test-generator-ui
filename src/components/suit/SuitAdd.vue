<template>
  <div class="suit-card-add holder">
    <h1>Suit Add</h1>
    <div><label><span>Title:</span><input v-model.lazy="suit.name" type="text" /></label></div>
    <div>
      <label><span>Priority:</span>
        <select v-model="suit.priority">
          <option value="1" selected>1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </label>
    </div>
    <div><label><span>Tags:</span><input v-model.lazy="suit.tags" type="text" /></label></div>
    <div><label><span class="b-block">Description:</span><textarea v-model.lazy="suit.description"></textarea></label></div>
    <div class="buttons-holder">
      <v-button :disabled="!isDirty" @click="addSuit">Save</v-button>
      <v-button  @click="resetSuit" markup="warning">Reset</v-button>
    </div>
  </div>
</template>

<script>
  import AxiosClient from '@/utils/httpClient';
  import VButton from '@/components/ui/VButton';

  export default {
    components: { VButton },
    computed: {
      isDirty() {
        return this.dirty;
      },
    },
    data() {
      return {
        suit: {
          name: null,
          description: null,
          priority: 1,
          tags: null,
        },
        dirty: false,
      };
    },
    methods: {
      addSuit() {
        AxiosClient.post('/cucumber/suits/', this.suit)
          .then(() => {
            this.$router.push({ name: 'suits' });
          })
          .catch((e) => {
            console.warn(e);
          });
      },
      resetSuit() {
        Object.assign(this.suit, { name: null, description: null, priority: null });
        this.dirty = false;
      },
    },
    name: 'suit-add',
    watch: {
      suit: {
        handler() {
          this.dirty = true;
        },
        deep: true,
      },
    },
  };
</script>

<style lang="scss" scoped>

  .suit-card-add {
    width: 400px;
    & div {
      margin: 0 0 10px 0;
    }
  }

</style>
