<template>
  <section class="entity-add">
    <div class="uui-form-wrapper">
      <input type="text" v-model="entity.name" class="uui-form-element large" placeholder="Case Name" />
      <input type="text" v-model="entity.description" class="uui-form-element large" placeholder="Case Description" />
      <tags-component v-model="entity.tags"></tags-component>
      <div class="priority-component">
        <div class="title">Priority:</div>
        <div class="component">
          <epam-multiswitch large="true" :values="priorityValues" v-model="entity.priority"/>
        </div>
      </div>
    </div>
    <div class="form-buttons-holder">
      <epam-button @click="resetData" class="large">Cancel</epam-button>
      <epam-button @click="sendData" class="lime-green large">Add Case</epam-button>
    </div>
  </section>
</template>

<script>
  import EpamButton from '../ui/EpamButton';
  import EpamMultiswitch from '../ui/EpamMuiltswitch';
  import AxiosClient from '../../utils/httpClient';
  import TagsComponent from '../ui/TagsInput';

  export default {
    components: {
      EpamButton,
      EpamMultiswitch,
      TagsComponent,
    },
    data() {
      return {
        entity: {
          id: null,
          description: null,
          name: null,
          priority: 1,
          tags: [],
          status: 'NOT_DONE',
        },
        priorityValues: [
          { value: 1, text: 'Critical' },
          { value: 2, text: 'High' },
          { value: 3, text: 'Medium' },
          { value: 4, text: 'Low' },
          { value: 5, text: 'Lowest' },
        ],
      };
    },
    methods: {
      resetData() {
        Object.assign(this.entity, {
          id: null,
          description: null,
          name: null,
          priority: 1,
          tags: [],
          status: 'NOT_DONE',
        });
        if (this.onCancel) {
          this.onCancel();
        }
      },
      sendData() {
        const sendData = Object.assign({}, this.entity);
        const projectId = this.$route.params.projectId;
        AxiosClient.post(`/cucumber/projects/${projectId}/suits/${this.suitId}/cases/`, sendData)
          .then((response) => {
            sendData.id = response.data;
            this.$store.commit('addCase', { suitId: this.suitId, data: sendData });
            this.resetData();
            if (this.onSubmit) {
              this.onSubmit(sendData);
            }
          })
          .catch(() => {
          });
      },
    },
    mounted() {
    },
    name: 'CaseAdd',
    props: {
      onCancel: Function,
      onSubmit: Function,
      suitId: Number,
    },
  };
</script>

<style scoped>

</style>
