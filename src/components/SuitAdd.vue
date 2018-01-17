<template>
  <section class="entitiy-add">
    <div class="uui-form-wrapper">
      <input type="text" v-model="entitiy.name" class="uui-form-element large" placeholder="Suit Name" />
      <input type="text" v-model="entitiy.description" class="uui-form-element large" placeholder="Suit Description" />
      <input type="text" v-model="entitiy.tags" class="uui-form-element large" placeholder="Suit Tags" />
      <div class="priority-component">
        <div class="title">Priority:</div>
        <div class="component">
          <epam-multiswitch large="true" :values="priorityValues" v-model="entitiy.priority"/>
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
  import EpamButton from './ui/EpamButton';
  import EpamMultiswitch from './ui/EpamMuiltswitch';
  import AxiosClient from '../utils/httpClient';

  export default {
    components: {
      EpamButton,
      EpamMultiswitch,
    },
    data() {
      return {
        entitiy: {
          id: null,
          description: null,
          name: null,
          priority: 1,
          tags: null,
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
        Object.assign(this.entitiy, {
          id: null,
          description: null,
          name: null,
          priority: 1,
          // tags: null,
        });
        if (this.onCancel) {
          this.onCancel();
        }
      },
      sendData() {
        const sendData = Object.assign({}, this.entitiy);
        AxiosClient.post('/cucumber/suits/', sendData)
          .then((response) => {
            sendData.id = response.data;
            this.$store.addSuit(sendData);
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
