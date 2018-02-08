<template>
    <section class="entity-add" v-if="entity">
      <div class="uui-form-wrapper">
        <input type="text" v-model="entity.name"
          class="uui-form-element large"
          placeholder="Suit Name"
          @input="$v.entity.name.$touch()"
          :class="{ 'error': $v.entity.name.$error }"/>
      <input type="text" v-model="entity.description"
           class="uui-form-element large"
           placeholder="Suit Description"
           @input="$v.entity.description.$touch()"
           :class="{ 'error': $v.entity.description.$error }"/>
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
        <epam-button @click="save" 
          class="uui-button large"
          :class="buttonClass"
          v-bind:disabled="$v.entity.$invalid">Update suit</epam-button>
      </div>
    </section>
</template>

<script>
  import TagsComponent from '../ui/TagsInput';
  import EpamButton from '../ui/EpamButton';
  import EpamMultiswitch from '../ui/EpamMuiltswitch';
  import mapValidations from '../../validator';

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
    ...mapValidations(),
    methods: {
      save() {
        const sendData = {};
        Object.assign(sendData, this.entity);
        delete sendData.cases;
        console.log(this.entity);
        this.$store.dispatch('editSuitAsync', { projectId: this.projectId, suitId: this.entity.id, updateData: sendData })
          .then(() => {
            if (this.onSubmit) {
              this.onSubmit();
            }
          });
      },
      reset() {
        this.entity = JSON.parse(JSON.stringify(this.value));
        if (this.onCancel) {
          this.onCancel();
        }
      },
    },
    mounted() {
      console.log(this.entity);
    },
    update() {
    },
    watch: {
      value(n) {
        this.entity = JSON.parse(JSON.stringify(n));
      },
    },
    computed: {
      buttonClass() {
        return {
          disable: this.$v.entity.$invalid,
          'lime-green': !this.$v.entity.$invalid,
        };
      },
    },
    props: ['projectId', 'value', 'onCancel', 'onSubmit'],
    name: 'SuitEdit',
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
