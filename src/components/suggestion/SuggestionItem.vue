<template>
<div class="item-wrapper">
    <select class="select-type">
        <option v-for="item of types" :selected="suggestion.type===item[0]">{{item[1]}}</option>
    </select>
    <input type="text" class="uui-form-element input-suggestion" :placeholder="suggestion.content" :value="suggestion.content"/>
</div>
</template>


<script>
  import StepTypeMap from '@/constants/StepType';

  export default {
    components: {
    },
    data() {
      return {
        types: [...StepTypeMap],
      };
    },
    name: 'SuggestionItem',
    props: ['suggestion'],
  };
</script>

<style lang="less" scoped>
.input-suggestion {
    width: 90%;
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
</style>