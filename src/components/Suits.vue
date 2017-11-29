<template>
  <section class="suit-add">
    <h2>Add Suit</h2>
    <div class="uui-form-wrapper">
      <input type="text" v-model="suit.name" class="uui-form-element large" placeholder="Suit Name" />
      <input type="text" v-model="suit.description" class="uui-form-element large" placeholder="Suit Description" />
      <input type="text" v-model="suit.tags" class="uui-form-element large" placeholder="Suit Tags" />
      <div class="priority-component">
        <div class="title">Priority:</div>
        <div class="component">
          <epam-multiswitch large="true" :values="priorityValues" v-model="suit.priority"/>
        </div>
      </div>
    </div>
    <div>
      <v-button @click="sendData" class="lime-green large">Add Suit</v-button>
      <v-button @click="resetData" class="large">Cancel</v-button>
    </div>


  </section>
</template>

<script>
  import VButton from './ui/EpamButton';
  import EpamMultiswitch from './ui/EpamMuiltswitch';
  import AxiosClient from '../utils/httpClient';

  export default {
    components: {
      VButton,
      EpamMultiswitch,
    },
    data() {
      return {
        suit: {
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
        Object.assign(this.suit, {
          id: null,
          description: null,
          name: null,
          priority: 1,
          tags: null,
        });
      },
      sendData() {
        const sendData = Object.assign({}, this.suit);
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
    name: 'AddSuits',
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
