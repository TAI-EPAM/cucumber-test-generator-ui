<template>
    <button
      class="uui-button"
      :id="id"
      :class="markup"
      :name="name"
      :disabled="disabled"
      :large="large"
      @click="handleClick"
    >
      <slot></slot>
    </button>
</template>

<script>
  export default {
    name: 'v-button',
    props: {
      id: {
        type: String,
        default: null,
      },
      customClass: {
        type: String,
        default: null,
      },
      name: {
        type: String,
        default: null,
      },
      disabled: {
        type: Boolean,
        default: false,
      },
      large: {
        type: Boolean,
        default: false,
      },
      markup: {
        type: String,
        default: 'default',
      },
    },
    methods: {
      handleClick(e) {
        this.$emit('click', e);
      },
    },
  };
</script>

<style lang="less" scoped>
  @import '../../assets/vendors/epam-ui/less/uui-buttons.less';
</style>
