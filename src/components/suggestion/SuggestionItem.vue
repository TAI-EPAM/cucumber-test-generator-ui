<template>
<div class="item-wrapper">
    <select class="select-type">
        <option v-for="item of types" :selected="suggestion.type===item[0]">{{item[1]}}</option>
    </select>
    <input type="text" class="uui-form-element input-suggestion" :placeholder="suggestion.content" :value="suggestion.content"/>
    <epam-button @click="() => deleteSuggestion(suggestion.id)" class="suggestion-delete"><i class="fa fa-xl fa-remove" aria-hidden="true"></i></epam-button>
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
    data() {
      return {
        types: [...StepTypeMap],
      };
    },
    methods: {
      ...mapActions({ deleteSuggestion: 'deleteSuggestionAsync' }),
    },
    name: 'SuggestionItem',
    props: ['suggestion'],
  };
</script>

<style lang="less" scoped>
.input-suggestion {
    width: 80%;
    color: black;
    display: inline;
}
.select-type {
  display: inline;
  height: 35px;
}
.item-wrapper {
  width: 100%;
  
}
.suggestion-delete {
  display: inline;
  background-color: #ebeef0;
  padding: 5px 10px;
  border: 1px solid #cccccc;
    .fa.fa-remove {
      color: #999999;
    }
}
</style>