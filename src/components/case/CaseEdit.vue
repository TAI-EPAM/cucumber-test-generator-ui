<template>
  <div class="entity-card">
    <h3>Suit Edit</h3>
    <div class="entity-card-edit">
      <label><span>Description:</span> <textarea maxlength="255" v-model.lazy="localEntity.description"/></label>
      <label><span>Priority:</span>
        <select v-model="localEntity.priority">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </label>
      <label><span>Tags:</span> <input type="text" v-model.lazy="localEntity.temp_tags"/></label>
    </div>

    !{{this.suitId}}!

    <div class="buttons-holder">
      <v-button @click="save">Save Case</v-button>
      <v-button @click="cancel" markup="warning">Cancel</v-button>
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
        localEntity: Object.assign({}, this.entity),
        dirty: false,
      };
    },
    methods: {
      cancel() {
        this.localEntity = Object.assign({}, this.localEntity);
        this.$bus.$emit('suit-cancel', this.localEntity);
      },
      save() {
        AxiosClient.post(`/cucumber/suits/${this.suitId}/cases`, this.localEntity)
          .then(() => {
            Object.assign(this.entity, this.localEntity);
            this.$bus.$emit('case-save', this.localEntity);
          })
          .catch(() => {
          });
      },
    },
    mounted() {

    },
    name: 'case-edit',
    props: {
      entity: {
        description: {
          type: String,
          default: null,
        },
        id: {
          type: Number,
          default: null,
        },
        priority: Number,
        default: 1,
        tags: {
          type: [],
          default: null,
        },
      },
      suitId: {
        type: Number,
        default: null,
      },
    },
    watch: {
      suit(newValue) {
        this.localEntity = Object.assign({}, newValue);
        this.dirty = false;
      },
    },
  };

</script>

<style lang="scss" scoped>

</style>
