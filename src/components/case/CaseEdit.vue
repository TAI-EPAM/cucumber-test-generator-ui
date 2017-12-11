<template>
  <section class="entity-add" v-if="entity">
    <div class="uui-form-wrapper">
      <input type="text" v-model="entity.description" class="uui-form-element large" placeholder="Case Description" />
      <input type="text" v-model="entity.tags" class="uui-form-element large" placeholder="Case Tags" />
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
  import EpamButton from '../ui/EpamButton';
  import EpamMultiswitch from '../ui/EpamMuiltswitch';

  export default {
    components: {
      EpamButton,
      EpamMultiswitch,
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
        const sendData = this.entity;
        delete sendData.steps;
        AxiosClient.put(`/cucumber/suits/${this.suitId}/cases/${this.entity.id}`, sendData)
          .then(() => {
            if (this.onSubmit) {
              this.onSubmit(sendData);
            }
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
      /*
      value(n) {
        this.entity = JSON.parse(JSON.stringify(n));
      },
      */
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
