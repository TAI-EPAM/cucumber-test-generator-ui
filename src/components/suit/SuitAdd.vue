<template>
  <section class="entity-add">
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
          <priority-select v-model="entity.priority" />
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
  import { mapGetters } from 'vuex';
  import EpamButton from '../ui/EpamButton';
  import PrioritySelect from '../ui/PrioritySelect';
  import TagsComponent from '../ui/TagsInput';
  import { mapValidationsSuit } from '../../utils/validator';

  export default {
    components: {
      EpamButton,
      PrioritySelect,
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
          rowNumber: 1,
          status: 'NOT_DONE',
        },
      };
    },
    ...mapValidationsSuit(),
    methods: {
      resetData() {
        Object.assign(this.entity, {
          id: null,
          description: null,
          name: null,
          priority: 1,
          tags: null,
          status: 'NOT_DONE',
        });
        if (this.onCancel) {
          this.onCancel();
        }
      },
      sendData() {
        const data = Object.assign({}, this.entity);
        const projectId = this.$route.params.projectId;
        data.rowNumber = this.getCountSuits + 1;
        this.$store.dispatch('addSuitAsync', { projectId, data })
        .then(() => { this.resetData(); });
      },
    },
    mounted() {

    },
    computed: {
      ...mapGetters({ getCountSuits: 'getCountActiveSuits' }),
      buttonClass() {
        return {
          disable: this.$v.entity.$invalid,
          'lime-green': !this.$v.entity.$invalid,
        };
      },
    },
    name: 'suitAdd',
    props: {
      onCancel: Function,
      onSubmit: Function,
    },
};
</script>

<style lang="less" scoped>
.uui-input-group {
  display: block;
}

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
