<template>
<input type="text" class="uui-form-element" :placeholder="suggestion.content" :value="suggestion.content"/>
</template>


<script>

  export default {
    components: {
    },
    data() {
      return {};
    },
    name: 'suggestion-item',
    props: ['suggestion'],
  };
</script>

<style lang="less" scoped>
.uui-form-element {
    width: 100%;
    color: black;
}
</style>