<template>
  <div>
    <div v-show="viewMode === 'add'" class="entity-card">
      <h3>Add Case</h3>
      <div class="entity-edit">
        <label><span>Priority:</span>
          <select v-model="localEntity.priority">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </label>
        <label><span>Description:</span> <textarea maxlength="255" v-model.lazy="localEntity.description"/></label>
        <label><span>Tags:</span> <input type="text" v-model.lazy="localEntity.tags_temp"/></label>
      </div>

      <div class="buttons-holder">
        <v-button @click="addCase">Add Case</v-button>
        <v-button @click="cancelAddCase" markup="warning">Cancel</v-button>
      </div>
    </div>

    <div v-show="viewMode === 'none'">

    </div>
  </div>

</template>


<script>
  import AxiosClient from '@/utils/httpClient';
  import VButton from '@/components/ui/VButton';

  export default {
    components: { VButton },
    computed: {
    },
    data() {
      return {
        localEntity: Object.assign({}, this.case),
        dirty: false,
        viewMode: this.mode,
      };
    },
    methods: {
      addCase() {
        if (this.localEntity.tags_temp) {
          this.localEntity.tags = this.localEntity.tags_temp.replace(/\s+/g, ' ').trim().split(' ');
        }
        AxiosClient.post(`/cucumber/suits/${this.suitId}/cases`, this.localEntity)
          .then((response) => {
            this.localEntity = {};
            this.$bus.$emit('case-add', response.data);
          })
          .catch((e) => {
            console.warn(e);
          });
      },
      cancelAddCase() {
        this.localEntity = {};
        this.$bus.$emit('mode-change', ['caseMode', 'none']);
        this.$bus.$emit('mode-change', ['suitMode', 'view']);
      },
      cancelEditCase() {
        this.$bus.$emit('mode-change', ['caseMode', 'view']);
      },
      editCase() {
        this.$bus.$emit('mode-change', ['caseMode', 'edit']);
      },
      removeCase() {
      },
      saveCase() {
      },
      viewCase() {
        this.$bus.$emit('mode-change', ['caseMode', 'view']);
      },
    },
    mounted() {
    },
    name: 'case',
    props: {
      case: {
        description: {
          type: String,
          default: null,
        },
        id: {
          type: Number,
          default: null,
        },
        priority: Number,
        default: 1,
        tags: {
          type: Array,
          default: [],
        },
      },
      mode: {
        type: String,
        default: 'none',
      },
      suitId: {
        type: Number,
        default: null,
      },
    },
    watch: {
      case(newValue) {
        this.data.localEntity = Object.assign({}, newValue);
        this.data.dirty = false;
      },
      mode(newValue) {
        console.warn(`mode  = ${newValue}`);
        this.viewMode = newValue;
      },
    },
  };
</script>

<style lang="scss" scoped>

  .entity-card {
    font-size: 12px;
    padding: 20px;
    border: 1px #f3f4f3 solid;
    border-radius: 3px;

    & h3 {
      font-weight: normal;
      margin: 0 0 20px 0;
      display: block;
      position: relative;
    }
  }

  .entity-edit {
    width: 100%;

    & label {
      display: block;
      margin: 0 0 14px;

      & span {
        display: block;
        line-height: 20px;
        opacity: 0.7;
      }
    }

  }


</style>

