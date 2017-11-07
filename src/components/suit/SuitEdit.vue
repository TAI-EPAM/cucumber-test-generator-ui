<template>
  <div class="suit-card-add holder">
    <h1>Suit Edit</h1>
    <div><label><span>Title:</span><input v-model.lazy="localSuit.name" type="text" /></label></div>
    <div>
      <label><span>Priority:</span>
        <select v-model="localSuit.priority">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </label>
    </div>
    <div><label><span>Tags:</span><input v-model.lazy="localSuit.tags" type="text" /></label></div>
    <div><label><span class="b-block">Description:</span><textarea v-model.lazy="localSuit.description"></textarea></label></div>
    <div class="buttons-holder">
      <v-button :disabled="!isDirty" @click="editSuit">Save</v-button>
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
      editSuit() {
        AxiosClient.pust('/cucumber/suits/', this.localSuit)
          .then(() => {
            this.$router.push({ name: 'suits' });
          })
          .catch((e) => {
            console.warn(e);
          });
      },
      resetSuit() {
        Object.assign(this.localSuit, this.suit);
        this.dirty = false;
      },
    },
    name: 'suit-edit',
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
