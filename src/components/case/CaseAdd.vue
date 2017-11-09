<template>
  <div class="entity-card">
    <h3>Add Case</h3>

    <div class="entity-card-edit">
      <label><span>Description:</span> <textarea maxlength="255" v-model.lazy="entity.description"/></label>
      <div class="entity-card-edit">
        <label><span>Priority:</span>
          <select v-model="entity.priority">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </label>
        <label><span>Tags:</span> <input type="text" v-model.lazy="entity.tags_temp"/></label>
      </div>
    </div>

    <div class="buttons-holder">
      <v-button @click="add">Add Case</v-button>
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
        entity: {
          description: null,
          priority: 1,
          tags: null,
        },
        dirty: false,
      };
    },
    methods: {
      add() {
        if (this.entity.tags_temp) {
          this.entity.tags = this.entity.tags_temp.replace(/\s+/g, ' ').trim().split(' ');
        }
        AxiosClient.post(`/cucumber/suits/${this.suitId}/cases`, this.entity)
          .then((response) => {
            this.entity = {};
            this.$bus.$emit('case-add', response.data);
          })
          .catch(() => {
          });
      },
      cancel() {
        this.entity = {};
        this.$bus.$emit('case-cancel');
      },

    },
    mounted() {
    },
    name: 'case-add',
    props: {
      suitId: {
        type: Number,
        default: null,
      },
    },
  };
</script>

<style lang="scss" scoped>

</style>
