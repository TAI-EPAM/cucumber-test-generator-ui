<template>
  <div class="entity-card">
    <h3>Case</h3>
    <ul class="entity-props">
      <li>{{entity.description }}</li>
      <li>created: {{ entity.creationDate}}</li>
      <li class="suit-tags"><strong>tags:</strong> {{ createTagsString() }}</li>
    </ul>

    <div class="buttons-holder">
      <v-button @click="remove">remove Case</v-button>
      <v-button @click="cancel" markup="warning">Close</v-button>
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
      createTagsString() {
        const names = this.entity.tags.map(item => item.name);
        return names.toString(':');
      },
      cancel() {
        this.$bus.$emit('case-cancel');
      },
      remove() {
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
    name: 'case-view',
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
    },
  };

</script>

<style lang="scss" scoped>

</style>
