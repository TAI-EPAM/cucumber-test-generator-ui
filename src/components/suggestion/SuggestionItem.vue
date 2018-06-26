<template>
  <div class="item-wrapper">
    <div class="item-line-wrapper">
      <select v-model="entityData.type" @change="setCheck" class="select-type">
        <option v-for="item in types">
          {{item[1]}}
        </option>
      </select>
      <input type="text" class="uui-form-element input-suggestion"
             v-model="entityData.content"
             v-on:input="setCheck"
      />
      <epam-button @click="deleteSuggestion"
                   class="suggestion-delete" v-if="!showCheck">
        <i class="fa fa-xl fa-remove icon" aria-hidden="true"></i>
      </epam-button>
      <epam-button @click="updateValue"
                   class="suggestion-apply" v-if="showCheck">
        <i class="fa fa-check icon" aria-hidden="true"></i>
      </epam-button>
    </div>
  </div>
</template>


<script>
  import { mapActions, mapGetters } from 'vuex';
  import StepTypeMap from '@/constants/StepType';
  import EpamButton from '../ui/EpamButton';

  export default {
    components: {
      ...mapGetters({ getSuggestions: 'getCurrentSuggestions' }),
      EpamButton,
    },
    data() {
      return {
        types: [...StepTypeMap],
        entity: { },
        showCheck: false,
      };
    },
    computed: {
      entityData() {
        this.entity = this.suggestion;
        return this.entity;
      },
    },
    methods: {
      ...mapActions({
        deleteSuggestion: 'deleteSuggestionAsync',
        updateSuggestion: 'updateSuggestionAsync',
      }),
      setCheck() {
        this.showCheck = true;
      },
      updateValue() {
        const data = { ...this.entity, ...{ version: this.entity.version || 0 } };
        this.$store.dispatch('updateSuggestionAsync', { data, projectId: this.$route.params.projectId })
          .then(() => {
          });
        this.showCheck = false;
      },
      deleteSuggestion() {
        this.$store.dispatch('deleteSuggestionAsync', { suggestionId: this.suggestion.id, projectId: this.$route.params.projectId })
          .then(() => {
          });
      },
    },
    name: 'SuggestionItem',
    props: ['suggestion'],
  };
</script>

<style lang="less" scoped>
  @import "../../assets/vendors/epam-ui/less/uui-colors";
  @import "../../assets/vendors/epam-ui/less/uui-fonts";

  .item-wrapper {
    width: 100%;
    margin-bottom: 4px;
  }

  .item-line-wrapper {
    display: flex;

    .fa.fa-remove {
      color: @gray;
    }
    .fa.fa-pencil {
      color: @gray;
      margin: 10px;
    }
  }

  .input-suggestion {
    flex-grow: 2;
    color: black;
    outline: none;
    border: none;
    border: 1px solid @gray_border;
    background-color: @gray_input_bg;
  }

  .input-suggestion:focus {
    background-color: @white;
    border-color: @blue;
  }

  .select-type {
    align-self: stretch;
    border: none;
    background-color: @white;
    color: @gray;
    font-family: @Oswald_Regular;
    font-size: 14px;
  }

  .suggestion-update {
    display: none;
    border: none;
    background-color: white;
    &.pen {
      display: flex;
    }
  }

  .suggestion-delete {
    justify-content: flex-end;
    padding: 5px 10px;
    background-color: @white;
    border: 1px solid @white;
    border-radius: 50%;
    margin-left: 4px;
  }

  .suggestion-apply {
    justify-content: flex-end;
    padding: 5px 10px;
    background-color: @green_lime;
    border: 1px solid @white;
    color: white;
    border-radius: 50%;
  }

</style>
