<template>
<div class="item-wrapper">
    <select class="select-type">
        <option v-for="item in types" :selected="suggestion.type===item.text">{{item.text}}</option>
    </select>
    <input type="text" class="uui-form-element input-suggestion" :placeholder="suggestion.content" :value="suggestion.content"/>
</div>
</template>


<script>

  export default {
    components: {
    },
    data() {
      return {
        types: [
          { value: 1, text: 'GIVEN' },
          { value: 2, text: 'WHEN' },
          { value: 3, text: 'THEN' },
        ],
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