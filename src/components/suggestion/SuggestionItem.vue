<template>
<div class="item-wrapper">
 <div class="item-line-wrapper">
      <select @change="updateSuggestion(entity)" v-model="entity.type"
        class="select-type">
          <option v-for="item in types"
           :selected="suggestion.type===item[0]">{{item[1]}}</option>
      </select>
        <input type="text" class="uui-form-element input-suggestion"
          :placeholder="suggestion.content"
          :value="suggestion.content"
          v-on="{mouseover:showPen, mouseleave: hidePen}"
          :readonly="!canUpdateContent"
          v-focus="canUpdateContent"
          />
        <button role="button" class="suggestion-update"
            v-on="{mouseover: showPen,
                  mouseleave: hidePen,
                  click: setUpdateMode}"
            v-bind:class="{'pen': isShownPen}">
                <i class="fa fa-xl fa-pencil" aria-hidden="true"></i></button>
        <epam-button @click="deleteSuggestion(suggestion.id)"
          class="suggestion-delete">
          <i class="fa fa-xl fa-remove" aria-hidden="true"></i>
        </epam-button>
    </div>
</div>
</template>


<script>
  import { mapActions } from 'vuex';
  import StepTypeMap from '@/constants/StepType';
  import EpamButton from '../ui/EpamButton';

  export default {
    components: {
      EpamButton,
    },
    directives: {
      focus(el, value) {
        if (value) {
          // this.hidePen();
          el.focus();
          // console.log(el);
        }
      },
    },
    data() {
      return {
        types: [...StepTypeMap],
        entity: {
          content: this.suggestion.content,
          id: this.suggestion.id,
          type: this.suggestion.type,
        },
        isShownPen: false,
        canUpdateContent: false,
      };
    },
    methods: {
      ...mapActions({ deleteSuggestion: 'deleteSuggestionAsync',
        updateSuggestion: 'updateSuggestionAsync' }),
      showPen() {
        this.isShownPen = true;
      },
      hidePen() {
        this.isShownPen = false;
      },
      setUpdateMode() {
        this.canUpdateContent = true;
        console.log('can write');
      },
      resetUpdateMode() {
        this.canUpdateContent = false;
      },
    },
    name: 'SuggestionItem',
    props: ['suggestion'],
  };
</script>

<style lang="less" scoped>
.item-wrapper {
  width: 100%;
}
.item-line-wrapper {
  display: flex;
  border: 1px solid gray;
  .fa.fa-remove {
      color: #999999;
    }
  .fa.fa-pencil {
      color: #999999;
      margin: 10px;
  }
}
.input-suggestion {
    flex-grow: 2;
    color: black;
    outline: none;
    border: none;
}
.select-type {
  align-self: stretch;
  border: none;
  background-color: #ebeef0;
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
  background-color: #ebeef0;
  padding: 5px 10px;
  border-left: 1px solid #cccccc;
}

</style>
