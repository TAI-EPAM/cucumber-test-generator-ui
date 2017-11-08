<template>

  <div v-if="localSuit">
    <div class="suit-card" v-show="viewMode === 'view'">
      <h3>{{localSuit.name}} <span class="priority">priority: {{localSuit.priority }}</span> </h3>
      <ul class="suit-props">
        <li>{{localSuit.description }}</li>
        <li>created: {{ localSuit.creationDate}}</li>
        <li class="suit-tags"><strong>tags:</strong> {{localSuit.tags }}</li>
      </ul>
      <div class="buttons-holder">
        <v-button @click="editSuit">Edit Suit</v-button>
        <v-button @click="removeSuit" markup="error">Remove Suit</v-button>
      </div>
    </div>

    <div class="suit-card" v-show="viewMode === 'edit'">
      <div class="suit-card-edit">
        <label><span>Name:</span> <input type="text" v-model.lazy="localSuit.name"/></label>
        <label><span>Priority:</span>
          <select v-model="localSuit.priority">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </label>
        <label><span>Description:</span> <textarea maxlength="255" v-model.lazy="localSuit.description"/></label>
        <label><span>Tags:</span> <input type="text" v-model.lazy="localSuit.tags"/></label>
      </div>

      <div class="buttons-holder">
        <v-button @click="saveSuit">Save Suit</v-button>
        <v-button @click="cancelEditSuit" markup="warning">Cancel</v-button>
      </div>
    </div>

    <div class="suit-card" v-show="viewMode === 'add'">
      <div class="suit-card-edit">
        <label><span>Name:</span> <input type="text" v-model.lazy="localSuit.name"/></label>
        <label><span>Priority:</span>
          <select v-model="localSuit.priority">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </label>
        <label><span>Description:</span> <textarea maxlength="255" v-model.lazy="localSuit.description"/></label>
        <label><span>Tags:</span> <input type="text" v-model.lazy="localSuit.tags"/></label>
      </div>

      <div class="buttons-holder">
        <v-button @click="addSuit">Save Suit</v-button>
        <v-button @click="cancelAddSuit" markup="warning">Cancel</v-button>
      </div>
    </div>

  </div>

</template>

<script>
  import AxiosClient from '@/utils/httpClient';
  import VButton from '../ui/VButton';

  export default {
    components: { VButton },
    computed: {
    },
    data() {
      return {
        localSuit: Object.assign({}, this.suit),
        dirty: false,
        viewMode: 'view', // view, edit
      };
    },
    methods: {
      addSuit() {
        AxiosClient.post('/cucumber/suits/', this.localSuit)
          .then((response) => {
            this.localSuit.id = response.data;
            this.$bus.$emit('suit-add', this.localSuit);
            this.viewMode = 'view';
          })
          .catch((e) => {
            console.warn(e);
          });
      },
      cancelAddSuit() {
        this.localSuit = {};
      },
      cancelEditSuit() {
        this.localSuit = Object.assign({}, this.suit);
        this.viewMode = 'view';
      },
      editSuit() {
        this.viewMode = 'edit';
      },
      removeSuit() {
        const suitId = this.localSuit.id;
        AxiosClient.delete(`/cucumber/suits/${suitId}`)
          .then(() => {
            this.$router.push({ name: 'suits' });
            this.$bus.$emit('suit-delete', suitId);
          })
          .catch((e) => {
            console.warn(e);
          });
      },
      saveSuit() {
        AxiosClient.post('/cucumber/suits/', this.localSuit)
          .then(() => {
            this.$bus.$emit('suit-save', this.localSuit);
            this.viewMode = 'view';
          })
          .catch((e) => {
            console.warn(e);
          });
      },
      viewSuit() {
        this.viewMode = 'view';
      },
    },
    mounted() {
    },
    name: 'suit',
    props: {
      suit: {
        description: {
          type: String,
          default: null,
        },
        id: {
          type: Number,
          default: null,
        },
        name: {
          type: String,
          default: null,
        },
        priority: Number,
        default: 1,
        tags: {
          type: String,
          default: null,
        },
      },
      mode: {
        type: String,
        default: 'view',
      },
    },
    watch: {
      suit(newValue) {
        this.$data.localSuit = Object.assign({}, newValue);
        this.dirty = false;
      },
      mode(newValue) {
        this.viewMode = newValue;
      },
    },
  };
</script>

<style lang="scss" scoped>

  .suit-card {
    font-size: 12px;
    padding: 20px;
    border: 1px #f3f4f3 solid;
    border-radius: 3px;



    & h3 {
      font-weight: normal;
      margin: 0 0 20px 0;
      display: block;
      position: relative;

      & span {
        display: inline-block;
        position: absolute;
        right: 0;
        font-size: 12px;
      }

    }

    .suit-props {
      list-style: none;
      margin: 0 0 20px 0;
      padding: 0;

      & li {
        margin: 0 0 10px 0;
      }
    }
  }

  .suit-card-edit {
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
