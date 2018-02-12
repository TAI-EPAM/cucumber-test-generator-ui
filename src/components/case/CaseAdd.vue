<template>
  <section class="entity-add">
    <div class="uui-form-wrapper">
       <input type="text" v-model="entity.name"
          class="uui-form-element large"
          placeholder="Case Name"
          @input="$v.entity.name.$touch()"
          :class="{ 'error': $v.entity.name.$error }"/>
      <input type="text" v-model="entity.description"
           class="uui-form-element large"
           placeholder="Case Description"
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
      <epam-button @click="resetData" class="large">Cancel</epam-button>
      <epam-button @click="sendData" 
        class="uui-button large"
        :class="buttonClass"
        :disabled="$v.entity.$invalid">Add Suit</epam-button>
    </div>
  </section>
</template>

<script>
  import EpamButton from '../ui/EpamButton';
  import EpamMultiswitch from '../ui/EpamMuiltswitch';
  import TagsComponent from '../ui/TagsInput';
  import mapValidations from '../../validator';

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
    ...mapValidations(),
    methods: {
      resetData() {
        Object.assign(this.entity, {
          id: null,
          description: null,
          name: null,
          priority: 1,
          steps: [],
          tags: [],
          status: 'NOT_DONE',
        });
        if (this.onCancel) {
          this.onCancel();
        }
        if (this.onSubmit) {
          this.onSubmit();
        }
      },
      sendData() {
        this.$store.dispatch('addCaseAsync', { projectId: this.projectId, suitId: this.suitId, data: this.entity })
        .then(() => {
          this.resetData();
        });
      },
    },
    mounted() {
    },
    computed: {
      buttonClass() {
        return {
          disable: this.$v.entity.$invalid,
          'lime-green': !this.$v.entity.$invalid,
        };
      },
    },
    name: 'CaseAdd',
    props: ['projectId', 'suitId', 'onCancel', 'onSubmit'],
  };
</script>

<style scoped>

</style>
