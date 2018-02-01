<template>
  <section class="entity-add" v-if="entity">
    <div class="uui-form-wrapper">
      <input type="text" v-model="entity.name" class="uui-form-element large" placeholder="Case Description" />
      <input type="text" v-model="entity.description" class="uui-form-element large" placeholder="Case Tags" />
      <tags-component v-model="entity.tags"></tags-component>
      <div class="priority-component">
        <div class="title">Priority:</div>
        <div class="component">
          <epam-multiswitch large="true" :values="priorityValues" v-model="entity.priority"/>
        </div>
      </div>
    </div>
    <div class="form-buttons-holder">
      <epam-button @click="reset" class="large">Cancel</epam-button>
      <epam-button @click="save" class="lime-green large">Save</epam-button>
    </div>
  </section>
</template>

<script>
  import AxiosClient from '../../utils/httpClient';
  import PROJECT_ID from '../../utils/projectID';
  import EpamButton from '../ui/EpamButton';
  import EpamMultiswitch from '../ui/EpamMuiltswitch';
  import TagsComponent from '../ui/TagsInput';

  export default {
    components: {
      EpamButton,
      EpamMultiswitch,
      TagsComponent,
    },
    data() {
      return {
        entity: JSON.parse(JSON.stringify(this.value)),
        priorityValues: [
          { value: 1, text: 'Critical' },
          { value: 2, text: 'High' },
          { value: 3, text: 'Medium' },
          { value: 4, text: 'Low' },
          { value: 5, text: 'Lowest' },
        ],
        origin: this.value,
      };
    },
    methods: {
      save() {
        const sendData = Object.assign({}, this.entity);
        const projectId = this.$route.params.projectId;
        sendData.action = 'CREATE';
        AxiosClient.put(`/cucumber/projects/${projectId}/suits/${this.suitId}/cases/${this.entity.id}`, sendData)
          .then(() => {
            if (this.onSubmit) {
              this.onSubmit(sendData, this.suitId, this.entity.id);
            }
            this.$store.commit('updateCase', {
              suitId: this.entity.id, caseId: this.entity.id, updateData: this.entity,
            });
          })
          .catch(() => {
          });
        // this.$emit('input', this.suit);
      },
      reset() {
        this.entity = JSON.parse(JSON.stringify(this.value));
        if (this.onCancel) {
          this.onCancel();
        }
      },
    },
    mounted() {
    },
    update() {
    },
    watch: {
    },
    props: ['value', 'suitId', 'onCancel', 'onSubmit'],
    name: 'caseEdit',
  };
</script>

<style lang="less" scoped>
  .entity-add {
    width: 600px;
    margin: 0 auto;
  }

  .priority-component {
    display: flex;
    align-items: center;
    & > .title {
      padding: 0 20px 0 0;
      vertical-align: bottom;
    }
    & > .component {
      flex-grow: 1;
      & > ul {
        width: 100%;
      }
    }
  }
</style>
