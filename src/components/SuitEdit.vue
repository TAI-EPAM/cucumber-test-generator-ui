<template>
    <section class="suit-add" v-if="suit">
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
      <div class="form-buttons-holder">
        <epam-button @click="reset" class="large">Cancel</epam-button>
        <epam-button @click="save" class="lime-green large">Save</epam-button>
      </div>
    </section>
</template>

<script>
  import AxiosClient from '../utils/httpClient';
  import EpamButton from './ui/EpamButton';
  import EpamMultiswitch from './ui/EpamMuiltswitch';

  export default {
    components: {
      EpamButton,
      EpamMultiswitch,
    },
    data() {
      return {
        suit: JSON.parse(JSON.stringify(this.value)),
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
        AxiosClient.put(`/cucumber/suits/${this.suit.id}`, this.suit)
          .then(() => {
            this.$store.updateSuit(this.suit.id, this.suit);
            if (this.onSubmit) {
              this.onSubmit();
            }
          })
          .catch(() => {
          });
          // this.$emit('input', this.suit);
      },
      reset() {
        this.suit = JSON.parse(JSON.stringify(this.value));
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
      value(n) {
        this.suit = JSON.parse(JSON.stringify(n));
      },
    },
    props: ['value', 'onCancel', 'onSubmit'],
    name: 'SuitEdit',
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
