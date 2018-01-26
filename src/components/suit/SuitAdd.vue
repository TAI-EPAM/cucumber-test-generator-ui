<template>
  <section class="entity-add">
    <div class="uui-form-wrapper">
      <input type="text" v-model="entity.name" class="uui-form-element large" placeholder="Suit Name" />
      <input type="text" v-model="entity.description" class="uui-form-element large" placeholder="Suit Description" />
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
      <epam-button @click="sendData" class="lime-green large">Add Suit</epam-button>
    </div>
  </section>
</template>

<script>
  import EpamButton from '../ui/EpamButton';
  import EpamMultiswitch from '../ui/EpamMuiltswitch';
  import TagsComponent from '../ui/TagsInput';
  import AxiosClient from '../../utils/httpClient';

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
          tags: null,
        });
        if (this.onCancel) {
          this.onCancel();
        }
      },
      sendData() {
        const sendData = Object.assign({}, this.entity);
        this.$store.commit('addSuit', sendData);
        AxiosClient.post('/cucumber/suits/', sendData)
          .then((response) => {
            sendData.id = response.data;
            this.resetData();
          })
          .catch(() => {
          });
      },
    },
    mounted() {
    },
    name: 'suitAdd',
    props: {
      onCancel: Function,
      onSubmit: Function,
    },
};
</script>

<style lang="less" scoped>
.suit-add {
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
